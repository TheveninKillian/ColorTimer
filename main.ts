// eslint-disable-next-line @typescript-eslint/no-var-requires
const { app, BrowserWindow } = require('electron')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const AspectRatioBrowserWindow = require('electron-aspect-ratio-browser-window')

function createWindow() {
  const win = new AspectRatioBrowserWindow({
    width: 960,
    height: 400,
    backgroundColor: '#000',
    fullscreenable: false,
    autoHideMenuBar: true,
    titleBarStyle: 'hidden',
    titleBarOverlay: {
      color: '#000',
      symbolColor: '#fff',
    },
  })

  win.setAspectRatio(12 / 5)

  win.loadFile('dist/index.html')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0)
      createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin')
    app.quit()
})
