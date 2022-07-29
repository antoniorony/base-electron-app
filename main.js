const {app, BrowserWindow, ipcMain, dialog} = require('electron')
const path = require('path')

function createWindow () {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  ipcMain.on('set-title', (event, title) => {
    const webContents = event.sender
    const win = BrowserWindow.fromWebContents(webContents)
    win.setTitle(title)
  })

  mainWindow.loadFile('index.html')
}

app.enableSandbox();
app.whenReady().then(() => {
  createWindow();

  ipcMain.handle('dialog:openFile', handleFileOpen);

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

  const win = new BrowserWindow();
  win.loadURL('https://tecinova.net');

  /*const win = new BrowserWindow({
    webPreferences: {
      sandbox: true
    }
  })
  win.loadURL('https://google.com')*/

})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
});

async function handleFileOpen() {
  const { canceled, filePaths } = await dialog.showOpenDialog()
  if (canceled) {
    return
  } else {
    return filePaths[0]
  }
}