export interface IElectronAPI {
  setTitle(titleValue: string): Promise<string>;
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
