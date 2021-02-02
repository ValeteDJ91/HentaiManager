const { app, BrowserWindow } = require('electron')

function createWindow () {
  const win = new BrowserWindow({
    width: 1536,
    height: 864,
    backgroundColor: "171C1D",
    webPreferences: {
      nodeIntegration: true
    },
    icon: __dirname + '/img/icon.ico'
  })

  //win.setMenu(null)
  win.loadFile('index.html')
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})