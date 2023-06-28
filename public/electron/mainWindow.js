const {
  BrowserWindow,
  globalShortcut,
  Tray,
  screen,
} = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');

function createWindow() {
  function showMainWindowAtMousePosition() {
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

  const sc_screenFocus = globalShortcut.register('CmdOrCtrl+Alt+V', () => {
    if (!mainWindow.isVisible()) showMainWindowAtMousePosition(); // Mostra a janela na posição do mouse se estiver oculta
  });

  if (!sc_screenFocus) console.log('Erro ao gerar atalho "CmdOrCtrl+Alt+V"');

  const tray = new Tray(path.join(__dirname, '../tray_icon.png'));
  // Lidar com o clique no ícone da bandeja
  tray.on('click', () => {
    if (!mainWindow.isVisible()) showMainWindowAtMousePosition(); // Mostra a janela na posição do mouse
  });

  mainWindow.on('closed', () => {
    mainWindow = null
  });

  mainWindow.on('blur', () => {
    mainWindow.hide();
  });
}

module.exports = createWindow();
