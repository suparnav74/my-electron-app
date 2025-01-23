"use client";
//import { NavigationMenuDemo } from "@/components/navbar"
//import { LoginForm } from "@/components/login-form";
import { useEffect, useState } from "react";

export default function Home() {
  const [appVersion, setAppVersion] = useState<string>("");
  const [status, setStatus] = useState("");
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    const fetchAppVersion = async () => {
      console.log("window.:", window);
      console.log("window.electronAPI:", window.electronAPI);
      if (window.electronAPI) {
        const version = await window.electronAPI.getAppVersion();
        setAppVersion(version);
      } else {
        console.log("electronAPI is not available");
      }
    };
     
    fetchAppVersion();

    const setButton = document.getElementById('btn');
    const titleInput = document.getElementById('title') as HTMLInputElement;

    const handleSetTitle = () => {
      const titleValue = titleInput.value;
      window.electronAPI.setTitle(titleValue); // Electron function to set the window title
    };

    if (setButton) {
      setButton.addEventListener('click', handleSetTitle);
    }

    // Clean up the event listener on unmount
    return () => {
      if (setButton) {
        setButton.removeEventListener('click', handleSetTitle);
      }
    };
  }, []);
  const saveFile = async () => {
    const content = "Hello, this is a test file!";
    const result = await window.electronAPI.saveFile(content);
    setStatus(result);
  };
  const sendNotification = async () => {
    try {
      await window.electronAPI.showNotification();
    } catch (error) {
      console.error('Error showing notification:', error);
    }
  
  }
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
      
        <h1>Next.js + Electron App</h1>
        <p>App Version: {appVersion}</p>
        <div>
          <button onClick={saveFile}>Save File</button>
          <p>{status}</p>
        </div>
        <div>
        <p>
          Title: <input id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="border-2 border-gray-300 p-2 rounded-md" />
        </p>
        <button type="button" id="btn" className="bg-blue-500 text-white p-2 rounded-md border-2 border-blue-700 outline-none hover:bg-blue-600 mt-2">Set Title</button>
        </div>
        <div>
          <button onClick={sendNotification}>Show Notification</button>
        </div>
      </main>
    </div>
  );

  // return (
  //   <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
  //     <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
  //     <NavigationMenuDemo/>
  //    <LoginForm/>
  // </main>
  // </div>
  // );
}
