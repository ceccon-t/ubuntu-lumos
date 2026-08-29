const { app, BrowserWindow, ipcMain, Menu } = require('electron');
const path = require('node:path');

function createWindow() {
  const window = new BrowserWindow({
    width: 1200,
    height: 800,
    backgroundColor: '#ffffff',
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  window.setMenuBarVisibility(false);
  window.setMenu(null);
  window.webContents.on('before-input-event', (event, input) => {
    if (input.type === 'keyDown' && input.key === 'F11') {
      event.preventDefault();
      window.setFullScreen(!window.isFullScreen());
    }
  });
  window.maximize();
  window.once('ready-to-show', () => window.show());
  window.loadFile('index.html');
}

app.whenReady().then(() => {
  Menu.setApplicationMenu(null);
  ipcMain.on('close-application', () => app.quit());
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
