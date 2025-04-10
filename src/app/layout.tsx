import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

// Configure the Poppins font
const poppins = Poppins({
    variable: "--font-poppins",
    weight: ["400", "500", "600"],
    subsets: ["latin"],
});

// Exporting metadata
export const metadata: Metadata = {
    title: "TaskStack",
    description: "Simple TODO List Website",
};

// Root layout component
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${poppins.variable} antialiased flex items-center content-center`}>
                {children}
            </body>
        </html>
    );
}
