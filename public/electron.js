const {app, Notification, BrowserWindow, electron, dialog, ipcMain} = require('electron');
const path = require('path');
const url = require('url');
const isDev = require('electron-is-dev');

const sudo = require('sudo-prompt');

const { exec } = require('child_process');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({width: 900, height: 680,   webPreferences: {
    nodeIntegration: true
  }});
  if (isDev) {
    mainWindow.loadURL('http://localhost:3000')
  } else {
    mainWindow.loadFile(path.join(__dirname, '../build/index.html'))
  }
  mainWindow.on('closed', () => mainWindow = null);
}


app.on('browser-window-created', async () => {
  if (process.platform !== "linux") {
      const options = {
          type: 'error',
          buttons: ['OK'],
          defaultId: 2,
          title: 'Error: OS not supported',
          message: 'OS not supported',
         };
      
        await dialog.showMessageBox(null, options, console.log("notified user no thinkpad-tools in path"));
        app.exit(0)
  }
  if (!shell.which("thinkpad-tools")) {
      const options = {
          type: 'error',
          buttons: ['OK'],
          defaultId: 2,
          title: 'Error: thinkpad-tools not found',
          message: 'thinkpad-tools not found in PATH',
          detail: 'Please ensure that thinkpad-tools is installed and that it is in your PATH',
         };
      
        await dialog.showMessageBox(null, options, console.log("notified user no thinkpad-tools in path"));
        app.exit(0)
  }
  
})


app.on('ready', createWindow);
var options = {
  name: 'ThinkpadToolsGUITrackpoint',
};
ipcMain.on('get-tp-trackpoint-status', (event, arg) => {
  out = ""
  sudo.exec('$(which thinkpad-tools) trackpoint status', {name: "Thinkpad Tools GUI"}, (error, stdout, stderr) => {
      if (error) {
          event.returnValue = {errormsg: error}
          console.log(stderr)
          throw error
      } else {
          event.returnValue = {sensitivity: parseInt(stdout.match(/\d+/g)[0]), speed: parseInt(stdout.match(/\d+/g)[1])}
      }
      console.log(event.returnValue)
  }
);
})

ipcMain.on('set-tp-settings', (event, arg) => {
  sudo.exec('$(which thinkpad-tools) trackpoint set-speed ' + arg.speed + ' && $(which thinkpad-tools) trackpoint set-sensitivity ' + arg.sensitivity , {name: "Thinkpad Tools GUI"}, (error, stdout, stderr) => {
      if (error) {
          event.returnValue = {errormsg: error}
          throw error
      } else {
          event.returnValue = "done"
      }
  }
);
})

ipcMain.on('get-list-bats', (event, arg) => {
  exec('thinkpad-tools battery list', (err, stdout, stderr) => {
      event.returnValue = stdout.replace(/\s/g, '')
    });
})

ipcMain.on('get-battery-status', (event, arg) => {
  exec('thinkpad-tools battery status', (err, stdout, stderr) => {
      lines = stdout.match(/[^\r\n]+/g)
      vals = []
      for (i = 0; i < lines.length; i++) {
          vals[i] = lines[i].split(':')[1].replace(/\s/g, '')
      }
      event.returnValue = vals
  });
})
ipcMain.on('get-battery-tags', (event, arg) => {
  exec('thinkpad-tools battery status', (err, stdout, stderr) => {
      lines = stdout.match(/[^\r\n]+/g)
      vals = []
      for (i = 0; i < lines.length; i++) {
          vals[i] = lines[i].split(':')[0]
      }
      event.returnValue = vals
  });
})
app.on('window-all-closed', () => {
    app.quit();
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});