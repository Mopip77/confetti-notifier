const { app, BrowserWindow } = require('electron');
const path = require('path');

// Get config from command line arguments
const configArg = process.argv.find(arg => arg.startsWith('{'));
const config = configArg ? JSON.parse(configArg) : {};

function createWindow() {
  const { screen } = require('electron');
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width, height } = primaryDisplay.bounds;

  const win = new BrowserWindow({
    x: 0,
    y: 0,
    width,
    height,
    transparent: true,
    frame: false,
    alwaysOnTop: true,
    hasShadow: false,
    skipTaskbar: true,
    focusable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  // Set window level to float above all windows
  win.setAlwaysOnTop(true, 'screen-saver');

  // Prevent window from taking focus
  win.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });
  win.setFullScreenable(false);

  // Make window click-through so it doesn't interfere with desktop interaction
  win.setIgnoreMouseEvents(true);

  // Load the renderer HTML
  win.loadFile('renderer.html');

  // Pass config to renderer
  win.webContents.on('did-finish-load', () => {
    win.webContents.send('config', config);
  });

  // Auto-close window after animation duration + buffer
  const closeDelay = config.duration + 500;
  setTimeout(() => {
    win.close();
    app.quit();
  }, closeDelay);
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  app.quit();
});
