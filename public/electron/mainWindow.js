const { BrowserWindow, globalShortcut, Tray, screen } = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');

function createWindow() {
  function showMainWindowAtMousePosition() {
    if (mainWindow.isVisible()) return false;
    const { x, y } = screen.getCursorScreenPoint();
    mainWindow.setPosition(x, y);
    mainWindow.show();
    mainWindow.focus();
  }

  let mainWindow = new BrowserWindow({
    icon: path.join(__dirname, '../tray_icon.png'),
    width: 300,
    height: 500,
    maximizable: false,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  const startUrl = isDev
    ? 'http://0.0.0.0:3000'
    : `file://${path.join(__dirname, '../build/index.html')}`;

  mainWindow.loadURL(startUrl);

  const sc_screenFocus = globalShortcut.register(
    'Super+Alt+V',
    showMainWindowAtMousePosition
  );

  if (!sc_screenFocus) console.log('Erro ao gerar atalho "Super+Alt+V"');

  const tray = new Tray(path.join(__dirname, '../tray_icon.png'));
  tray.on('click', showMainWindowAtMousePosition);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  mainWindow.on('blur', () => {
    mainWindow.hide();
  });
}

module.exports = createWindow();
