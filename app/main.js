const { app, BrowserWindow } = require('electron');

let mainWindow = null;

app.on('ready', () => {
  console.log('hey');
  mainWindow = new BrowserWindow({
    minWidth: 400,
    minHeight: 300,
  });

  mainWindow.loadURL(`file://${__dirname}/index.html`);

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });
});
