"use client";
//import { NavigationMenuDemo } from "@/components/navbar"
//import { LoginForm } from "@/components/login-form";
import { useEffect, useState } from "react";

export default function Home() {
  const [appVersion, setAppVersion] = useState<string>("");
  const [status, setStatus] = useState("");

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
  };
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {/* <p>
          Title: <input id="title" />
        </p> */}
        <h1>Next.js + Electron App</h1>
        <p>App Version: {appVersion}</p>
        <div>
          <button onClick={saveFile}>Save File</button>
          <p>{status}</p>
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
