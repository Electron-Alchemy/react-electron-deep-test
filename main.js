//electron은 import를 이해하지 못하기에 require를 써야한다.
const { app, BrowserWindow, ipcMain, Notification } = require('electron');
const path = require('path');

const isDev = !app.isPackaged;

function createWindow() {
    //eletron window를 생성
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        backgroundColor: "white",
        webPreferences:{
            nodeIntegration: false,
            worldSafeExecuteJavaScript: true,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        }
    })

    //window를 띄운다.
    win.loadFile('index.html');
}  

//dev환경이라면
if (isDev){
    //electron reload를 위한 것
    require('electron-reload')(__dirname, {
        electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
    });
}

//low level API 설정
ipcMain.on('notify', (e, message) => {
    new Notification({title: 'Notification', body: message}).show();
});

//app이 준비되면 윈도우를 띄운다.
app.whenReady().then(createWindow);