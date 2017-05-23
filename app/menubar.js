const electron = require('electron');
const remote = electron.remote;
const { createWindow, sendText } = remote.require('./main');
const $ = require('jquery');

$('#launch-button').on('click', () => {
  createWindow($('.input-area').val());
});
