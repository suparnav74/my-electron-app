/* eslint-disable @typescript-eslint/no-require-imports */
const { contextBridge,ipcRenderer } = require('electron/renderer');
//import { contextBridge, ipcRenderer } from "electron";
console.log("Preload script loaded");
contextBridge.exposeInMainWorld("electronAPI", {
    on: (channel, callback) => {
        ipcRenderer.on(channel, callback);
    },
    send: (channel, args) => {
        ipcRenderer.send(channel, args);
    },
    getAppVersion: () => ipcRenderer.invoke('get-app-version'),
    saveFile: (content) => ipcRenderer.invoke('save-file', content),
    showNotification: () => ipcRenderer.invoke('show-notification'),
    setTitle: (title) => ipcRenderer.send('set-title', title)
});