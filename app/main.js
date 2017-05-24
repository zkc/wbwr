const { app, BrowserWindow } = require('electron');
const Menubar = require('menubar');
const windows = new Set()
const menubar = Menubar({
  width: 400,
  height: 500,
  icon: './images/white-owl.png'
})

const createWindow = exports.createWindow = (text) => {
  let newWindow = new BrowserWindow();
  windows.add(newWindow);

  newWindow.loadURL(`file://${__dirname}/reader.html`);

  newWindow.readerText = text

  newWindow.on('closed', () => {
    windows.delete(newWindow)
    newWindow = null
  });
}

menubar.on('ready', () => {
  console.log('wbwr ready');
});

menubar.on('after-create-window', () => {
  menubar.window.loadURL(`file://${__dirname}/index.html`);
  menubar.window.on('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      menubar.window.webContents.send('resized', {bounds: menubar.window.getBounds()});
    }, 150);
  });
});
