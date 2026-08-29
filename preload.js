const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('lumos', {
  close: () => ipcRenderer.send('close-application'),
});
