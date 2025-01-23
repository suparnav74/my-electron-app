export interface IElectronAPI {
  loadPreferences: () => Promise<void>;
  getAppVersion: () => Promise<string>;
  saveFile: (content: string) => Promise<string>;
  showNotification: () => Promise<void>;
}
declare global {
  interface Window {
    electronAPI: IElectronAPI;
  }
}
