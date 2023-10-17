const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  copy: (text) => {
    ipcRenderer.send('copy', text);
  },
  paste: () => {
    ipcRenderer.send('paste');
  },
});
