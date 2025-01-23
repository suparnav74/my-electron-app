declare global {
    interface Window {
      electronAPI: {
        getAppVersion: () => Promise<string>;
        saveFile: (content: string) => Promise<string>;
        showNotification: () => Promise<void>;
      };
    }
  }
  
  // Ensure the declaration is global by adding `export {}` to avoid "module" errors.
  export {};