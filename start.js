const {app, BrowserWindow} = require('electron');

function createWindow() {
    const win = new BrowserWindow({
        width: 1280,
        height: 720,
        webPreferences: {
            nodeIntegration: true
        }
    });

    win.webContents.openDevTools()
    win.loadFile('src/index.html')
}

app.whenReady().then(createWindow);
