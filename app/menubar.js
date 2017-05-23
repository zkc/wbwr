const electron = require('electron');
const remote = electron.remote;
const { createWindow } = remote.require('./main');
const $ = require('jquery');

$('#play-button').on('click', () => {
  createWindow();
});
