const electron = require('electron');
const remote = electron.remote;
const { createWindow } = remote.require('./main');
const $ = require('jquery');

const $viewer = $('.viewer')

const test = `The sky above. the port. was the color. of television, tuned
to a dead channel.
"It's not like I'm using," Case heard someone say, as he shouldered his way through the crowd around the door of the Chat.`

let SPEED = 100
let PAUSED = true

const splitter = (string) => {
  const stringRegExp = new RegExp(/[\n\s]/)
  const array = string.split(stringRegExp)

  return array.map( word => {
    const punctuationRegExp = new RegExp(/[.,\/#!$%\^&\*;:{}=\-_`~()]/)
    const result = { word, punctuation: false }

    if (word.match(punctuationRegExp)) {
      result.punctuation = true
    }
    return result
  })
}

//Just doing this to get the scope outside of the steper function
let viewer

const steper = (string) => {
  const array = splitter(string);
  let end = array.length - 1
  let currentWord = 0
  spewing = true

  viewer = () => {
    let wordObject
    if (!PAUSED) {
      if(currentWord<end){
        currentWord++
        wordObject = array[currentWord]

        if (array[currentWord - 1].punctuation) {
          setTimeout(() => {viewer(wordObject.word)}, SPEED + 100)
        } else {
          setTimeout(() => {viewer(wordObject.word)}, SPEED)
        }
      }
      $viewer.empty()
      $viewer.append(wordObject.word)
    }
  }
  viewer()
}


$('#play-button').on('click', () => {
  PAUSED = false
  steper($('textarea').val() || test)
})

$('#pause-button').on('click', () => {
  if (PAUSED) {
    PAUSED = !PAUSED
    viewer()
  } else {
    PAUSED = !PAUSED
  }
})

$('#faster-button').on('click', () => {
  SPEED -= 25
})

$('#slower-button').on('click', () => {
  SPEED += 25
})
