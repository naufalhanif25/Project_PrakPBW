"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

type Task = {
  id: number;
  title: string;
};

export default function TaskPage() {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");

  const fetchTasks = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first.");
      router.push("/signin");
      return;
    }

    try {
      const res = await fetch("https://api-todo-list-pbw.vercel.app/todo", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setTasks(data.data); // `data` mungkin punya struktur { data: [...] }
    } catch (error) {
      console.error("Failed to fetch tasks", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = async () => {
    if (!newTask.trim()) return;

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first.");
      router.push("/signin");
      return;
    }

    try {
      const res = await fetch("https://api-todo-list-pbw.vercel.app/todo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: newTask }),
      });

      const data = await res.json();
      setTasks((prev) => [...prev, data.data]); // `data.data` berisi task baru
      setNewTask("");
    } catch (error) {
      console.error("Failed to add task", error);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md space-y-4">
        <h1 className="text-3xl font-bold text-center">Task List</h1>

        <div className="flex gap-2">
          <Input
            placeholder="Add a new task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <Button onClick={handleAddTask}>
            <Plus className="h-4 w-4 mr-1" />
            Add
          </Button>
        </div>

        <div className="space-y-2">
          {tasks.map((task) => (
            <Card key={task.id}>
              <CardContent className="p-4">
                <p>{task.title}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
