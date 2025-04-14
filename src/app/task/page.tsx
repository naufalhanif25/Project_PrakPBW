"use client";  // Marks this component as a Client Component

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { HaveSignedIn, Popup, Loading } from "../components";
import axios from 'axios';

// TaskItem type
type TaskItem = {
    _id: string;
    createdAt: string;
    onCheckList: boolean;
    text: string;
    updateAt: string;
    userId: string;
}

// TaskResponse type
type TaskRespone = {
    message: string;
    data: TaskItem[];
}

// Task container component
function TaskContainer({signin}: {signin: boolean}) {
    const [tasks, setTasks] = useState<TaskItem[]>([]);
    const [newTask, setNewTask] = useState("");
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editedText, setEditedText] = useState("");

    const fullText = "You are not signed in, please sign in first or sign up if you do not have an account.";
    const [displayedText, setDisplayedText] = useState("");

    // Typing animation logic
    useEffect(() => {
        let currentIndex = 0;
        let text = []
        
        const interval = setInterval(() => {
            text.push(fullText[currentIndex]);

            setDisplayedText(() => text.join(""));

            currentIndex++;

            if (currentIndex >= fullText.length) {
                clearInterval(interval);
            }
        }, 60);

        return () => clearInterval(interval);
    }, []);

    const [showErrorPopup, setShowErrorPopup] = useState(false);
    const [showLoading, setShowLoading] = useState(false);
    const [errorTitle, setErrorTitle] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [onEdit, setOnEdit] = useState(false);

    const [user, setUser] = useState<{
        _id: string;
        fullName: string;
        email: string;
        token: string;
        status: boolean;
    }>({_id: '', fullName: '', email: '', token: '', status: false});
    
    useEffect(() => {
        const savedUser = localStorage.getItem("user");
    
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    // Fetching tasks from the API
    useEffect(() => {
        setShowLoading(true);

        const fetchTodos = async () => {
            try {
                const token = user.token;

                const response = await axios.get<TaskRespone>('https://api-todo-list-pbw.vercel.app/todo/getAllTodos', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const todos = response.data.data;
                
                setTasks(todos);
            } 
            catch (error: any) {
                console.error("Failed to fetch todos:", error);
                
                setErrorMessage("Failed to fetch task list. Please check your internet connection.");
                setErrorTitle("Failed to Fetch Task List!");
                setShowErrorPopup(true);
            }
            finally {
                setShowLoading(false);
            }
        };

        if (signin) {
            fetchTodos();
        }
    }, [signin]);

    // Function to handle added tasks
    const handleSubmit = async (e: React.FormEvent) => {
        const token = user.token;

        e.preventDefault();
        
        try {
            setShowLoading(true);

            const response = await axios.post<{ data: TaskItem }>(
                'https://api-todo-list-pbw.vercel.app/todo/createTodo',
                { 
                    text: newTask 
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
          
            console.log('Response:', response.data);

            setTasks([...tasks, response.data.data]);
            setNewTask("");
        } 
        catch (error: any) {
            console.error('Error posting data:', error);

            setErrorMessage("Failed to add task. Please check your internet connection.");
            setErrorTitle("Failed to Add Task!");
            setShowErrorPopup(true);
        }
        finally {
            setShowLoading(false);
        }
    };

    // Functions to handle task editing
    const handleEditSave = async (taskId: string, checkList: boolean) => {
        const token = user.token;
    
        try {
            setShowLoading(true);

            const response = await axios.put<{ data: TaskItem }>(
                `https://api-todo-list-pbw.vercel.app/todo/updateTodo/${taskId}`,
                { 
                    text: editedText,
                    onCheckList: checkList
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
    
            setTasks(prev =>
                prev.map(task =>
                    task._id === taskId ? { ...task, text: response.data.data.text } : task
                )
            );
            setEditingId(null);
        } 
        catch (error: any) {
            console.error("Edit failed:", error);

            setErrorMessage("Failed to edit task. Please try again.");
            setErrorTitle("Failed to Edit Task!");
            setShowErrorPopup(true);
        }
        finally {
            setShowLoading(false);
        }
    };

    // Function to handle task deletion
    const handleDelete = async (id: string) => {
        const token = user.token;
        
        try {
            setShowLoading(true);

            await axios.delete(`https://api-todo-list-pbw.vercel.app/todo/deleteTodo/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
    
            setTasks(prev => prev.filter(task => task._id !== id));
        } 
        catch (error: any) {
            console.error("Delete failed:", error);

            setErrorMessage("Failed to delete task. Please try again.");
            setErrorTitle("Failed to Delete Task!");
            setShowErrorPopup(true);
        }
        finally {
            setShowLoading(false);
        }
    };    

    // Add task component
    function AddTask({ task, date, listNum, onDelete }: { task: TaskItem, date: string, listNum: number, onDelete: (id: string) => void }) {
        const dateParts = date.split("T")[0].split("-");
        const dateFormat = `${dateParts[1]}-${dateParts[2]}-${dateParts[0].slice(2)}`;

        return (
            <>
                <div className="flex flex-row gap-[24px] p-[0.6em] items-center">
                    <p className="w-[12px]">{++listNum}</p>
                    <p className="date-text w-[80px]">{dateFormat}</p>
                    {editingId === task._id ? (
                        <input className="task-input flex-grow text-[12pt]" autoFocus required
                            value={editedText} 
                            onChange={(e) => setEditedText(e.target.value)} 
                            onBlur={() => handleEditSave(task._id, true)} 
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault();
                                    handleEditSave(task._id, true);
                                }
                            }
                        }/>
                    ) : (
                        <p className="flex-grow">{task.text}</p>
                    )}
                    <div className="task-icon z-100" onClick={() => {
                        if (!onEdit) {
                            setEditingId(task._id);
                            setEditedText(task.text);
                            setOnEdit(true);
                        }
                        else {
                            handleEditSave(task._id, true);
                            setOnEdit(false);
                        }
                    }}>
                        <svg className="w-full h-full" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                            <path d="M31.25 7.003c0-0 0-0.001 0-0.001 0-0.346-0.14-0.659-0.365-0.886l-5-5c-0.227-0.226-0.539-0.366-0.885-0.366s-0.658 0.14-0.885 0.366v0l-20.999 20.999c-0.146 0.146-0.256 0.329-0.316 0.532l-0.002 0.009-2 7c-0.030 0.102-0.048 0.22-0.048 0.342 0 0.691 0.559 1.251 1.25 1.252h0c0.126-0 0.248-0.019 0.363-0.053l-0.009 0.002 6.788-2c0.206-0.063 0.383-0.17 0.527-0.311l-0 0 21.211-21c0.229-0.226 0.37-0.539 0.371-0.886v-0zM8.133 26.891l-4.307 1.268 1.287-4.504 14.891-14.891 3.219 3.187zM25 10.191l-3.228-3.196 3.228-3.228 3.229 3.228z"></path>
                        </svg>
                    </div>
                    <div className="task-icon z-100" onClick={() => onDelete(task._id)}>
                        <svg className="w-full h-full" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                            <path d="M896.8 159.024l-225.277.001V71.761c0-40.528-33.008-72.496-73.536-72.496H426.003c-40.528 0-73.52 31.968-73.52 72.496v87.264h-225.28c-17.665 0-32 14.336-32 32s14.335 32 32 32h44.015l74.24 739.92c3.104 34.624 32.608 61.776 67.136 61.776h398.8c34.528 0 64-27.152 67.088-61.472l74.303-740.24h44.016c17.68 0 32-14.336 32-32s-14.32-31.985-32-31.985zM416.482 71.762c0-5.232 4.271-9.505 9.52-9.505h171.984c5.248 0 9.536 4.273 9.536 9.505v87.264h-191.04zm298.288 885.44c-.16 1.777-2.256 3.536-3.376 3.536h-398.8c-1.12 0-3.232-1.744-3.425-3.84l-73.632-733.856H788.45z"/>
                        </svg>
                    </div>
                </div>
            </>
        )
    }

    if (signin) {
        return (
            <>
                <div className="w-screen h-screen bottom-0 fixed flex items-center justify-center">
                    <div className="glass form w-[80vw] h-[70vh] flex flex-col gap-[1.2em] items-center justify-start">
                        <form className="w-full flex flex-row gap-[16px]" onSubmit={handleSubmit}>
                            <input type="text" id="taskname" placeholder="Add a task" className="input w-full text-[12pt]" value={newTask} onChange={(e) => setNewTask(e.target.value)} required/>
                            <button type="submit" className="solid-button text-[12pt] w-[200px]">Add task</button>
                        </form>
                        <div className="task-container w-full flex flex-col flex-grow overflow-auto">
                            {tasks.length > 0 ? (
                                tasks.map((task, index) => (
                                    <AddTask key={task._id} date={task.updateAt ? task.updateAt : task.createdAt} task={task} listNum={index} onDelete={handleDelete} />
                                ))
                            ) : (
                                <div className="w-full flex-grow flex items-center justify-center">
                                    <h1 className="text-[10pt] text-center">No tasks yet.</h1>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Popup */}
                <Popup 
                    showErrorPopup={showErrorPopup} 
                    setShowErrorPopup={setShowErrorPopup} 
                    errorTitle={errorTitle}
                    errorMessage={errorMessage}
                />

                {/* Loading animation */}
                <Loading showLoading={showLoading} />
            </>
        );
    }

    return (
        <div className="w-screen h-[65vh] top-0 fixed flex items-center justify-center">
            <h1 className="text-[10pt] text-center">
                <ins className="typing plain-text">{displayedText}</ins>
            </h1>
        </div>
    );
}
  

export default function Signin() {
    const router = useRouter();

    const [user, setUser] = useState<{
        _id: string;
        fullName: string;
        email: string;
        token: string;
        status: boolean;
    }>({_id: '', fullName: '', email: '', token: '', status: false});
    
    useEffect(() => {
        const savedUser = localStorage.getItem("user");
    
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
    }, []);

    return (
        <div className="flex flex-col w-full h-full items-center overflow-hidden">
            {/* Header */}
            <div className="header-text fixed w-full flex flex-row top-[4%] items-center justify-between">
                <button className="link-button text-[12pt] font-semibold" onClick={() => router.push("/")}>TaskStack</button>
                <div className="flex gap-[1.6em] items-center justify-center">
                    <HaveSignedIn signin={user.status} fullName={user.fullName}/>
                </div>
            </div>

            {/* Navigation bar */}
            <div className="glass fixed flex gap-[2.4em] top-[4%] items-center justify-center">
                <button className="header-button text-[12pt] flex flex-col justify-center items-center text-center" onClick={() => router.push("/")}>
                    Home
                    <hr className="button-underline" />
                </button>
                <button className="header-button text-[12pt] flex flex-col justify-center items-center text-center" onClick={() => router.push("/task")}>
                    Task
                    <hr className="button-underline" />
                </button>
                <button className="header-button text-[12pt] flex flex-col justify-center items-center text-center" onClick={() => router.push("/about")}>
                    About
                    <hr className="button-underline" />
                </button>
            </div>

            {/* Main container */}
            <TaskContainer signin={user.status} />

            {/* Footer */}
            <div className="front footer fixed w-full h-[10%] bottom-10 flex flex-col items-center justify-end">
                <p className="text-[8pt]">Copyright &copy; 2025 TaskStack. All rights reserved.</p>
            </div>

            {/* Purple cicle silhouette background */}
            <div className="background absolute flex justify-center w-[120vw] h-[50vh] bottom-0 overflow-hidden">
                <div className="circle-silhouette-outer translate-y-[2em] overflow-hidden absolute w-full h-[120%] rounded-t-[100%]"></div>
                <div className="circle-silhouette-outer translate-y-[2em] overflow-hidden absolute w-full h-[120%] flex justify-center items-center rounded-t-[100%] blur-[12px] brightness-[120%]">
                    <div className="circle-silhouette-inner translate-y-[-2px] w-[120%] h-[102%] rounded-t-[100%] blur-[32px]"></div>
                </div>
            </div>
        </div>
    )
}
