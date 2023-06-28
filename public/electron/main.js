const { app, globalShortcut } = require('electron');

function App() {
  const mainWindow = require('./mainWindow.js');
}

app.on('ready', async () => {
  App();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('will-quit', () => {
  globalShortcut.unregister('CmdOrCtrl+Alt+V');
});
