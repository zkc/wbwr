const electron = require('electron');
const $ = require('jquery');

const $viewer = $('.viewer')
const $scrollingCurrent = $('.scrolling-current')
const $scrollingPast = $('.scrolling-past')
const $scrollingFuture = $('.scrolling-future')

const testsring = `CSS Grid layout brings a two-dimensional layout tool to the web, with the ability to lay out items in rows and columns. CSS Grid can be used to achieve many different layouts. It excels at dividing a page into major regions, or defining the relationship in terms of size, position, and layer, between parts of a control built from HTML primitives.

Like tables, grid layout enables an author to align elements into columns and rows. However, unlike tables, grid layout doesn't have content structure, therefore enabling a wide variety of layouts not possible in tables. For example, a grid container's child elements could position themselves so they actually overlap and layer, similar to CSS positioned elements.

`

const textFromMenu = electron.remote.getCurrentWindow().readerText

let SPEED = 150
let PAUSED = true


const setWPM = () => {
  $('.wpm').empty().append(Math.floor(60/(SPEED * .001)))
}

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

//Just doing this to get the scope outside of the stepper function
let viewer
let currentWord
let array

const stepper = (string) => {
  array = splitter(string);
  let end = array.length - 1
  currentWord = 0

  displayUpdater(array, currentWord)

  viewer = () => {
    let wordObject
    if (!PAUSED) {
      if(currentWord<end){
        currentWord++
        wordObject = array[currentWord]

        if (array[currentWord].punctuation) {
          setTimeout(() => {viewer(wordObject.word)}, SPEED * 2)
        } else {
          setTimeout(() => {viewer(wordObject.word)}, SPEED)
        }
      } else {
        window.close()
      }
      displayUpdater(array,currentWord)
    }
  }
}

const displayUpdater = (array, index) => {
  const past = array.slice(0,index).map(obj => obj.word).join(" ")
  const future = array.slice(index +1, array.length - 1).map(obj => obj.word).join(" ")

  $viewer.empty()
  $viewer.append(array[index].word)
  $scrollingPast.empty();
  $scrollingCurrent.empty();
  $scrollingFuture.empty();
  $scrollingPast.append(past);
  $scrollingCurrent.append(array[index].word)
  $scrollingFuture.append(future);
  $('.read-count').empty().append(currentWord + 1)
  $('.remaining-count').empty().append(array.length - currentWord)
}

// setup viewer function stuffs
stepper(textFromMenu || testsring)
setWPM()

const playPause = () => {
  PAUSED = !PAUSED
  !PAUSED && viewer()
}

const faster = () => {
  SPEED -= 10
  setWPM()
}

const slower = () => {
  SPEED += 10
  setWPM()
}

const next = () => {
  PAUSED = true
  currentWord++
  displayUpdater(array, currentWord)
}

const back = () => {
  PAUSED = true
  currentWord--
  displayUpdater(array, currentWord)
}

$('html').on('keydown', (e) => {
  console.log();
  switch(e.keyCode){
    case 32:
      playPause();
      break;
    case 40:
      slower();
      break;
    case 38:
      faster();
      break;
    case 37:
      back()
      break;
    case 39:
      next()
      break;
  }
});

$('#play-pause-button').on('click', () => {
  playPause()
})

$('#faster-button').on('click', () => {
  faster()
})

$('#slower-button').on('click', () => {
  slower()
})
