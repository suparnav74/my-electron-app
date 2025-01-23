

import { app, BrowserWindow, ipcMain, dialog, Notification } from "electron";
import serve from "electron-serve";
import path from "path";
import fs from "fs";
//const __dirname = path.dirname(new URL(import.meta.url).pathname);

const __dirname = path.resolve();
const appServe = app.isPackaged ? serve({
  directory: path.join(__dirname, "../out")
}) : null;

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "main", "preload.js"),
      contextIsolation: true, 
      nodeIntegration: false, 
    }
  });
  //mainWindow.loadURL('http://localhost:3000');
  if (app.isPackaged) {
    appServe(win).then(() => {
      win.loadURL("app://-");
    });
  } else {
    win.loadURL("http://localhost:3000");
    win.webContents.openDevTools();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    win.webContents.on("did-fail-load", (e, code, desc) => {
      win.webContents.reloadIgnoringCache();
    });
  }
}

ipcMain.handle('get-app-version', () => {
  return app.getVersion();
});

app.on("ready", () => {
    createWindow();
});

app.on("window-all-closed", () => {
    if(process.platform !== "darwin"){
        app.quit();
    }
});
ipcMain.handle('save-file', async (event, content) => {
  const filePath = await dialog.showSaveDialog({
    filters: [{ name: 'Text Files', extensions: ['txt'] }],
  });
  if (filePath.filePath) {
    fs.writeFileSync(filePath.filePath, content);
    return 'File saved successfully';
  }
  return 'File saving was canceled';
});
ipcMain.on('set-title', (event, title) => {
  const webContents = event.sender
  const win = BrowserWindow.fromWebContents(webContents)
  win.setTitle(title)
})
function showNotification() {
  const notification = new Notification({
    title: 'Hello!',
    body: 'This is a system notification.',
  });
  notification.show();
}
ipcMain.handle('show-notification', () => {
  showNotification();
});