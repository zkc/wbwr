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

const stepper = (string) => {
  const array = splitter(string);
  let end = array.length - 1
  let currentWord = 0
  spewing = true
  $viewer.append(array[0].word)
  $scrollingCurrent.append(array[0].word)

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
      } else {
        window.close()
      }
      $viewer.empty()
      $viewer.append(wordObject.word)
      scroller(array,currentWord)
    }
  }
}

const scroller = (array, index) => {
  const past = array.slice(0,index).map(obj => obj.word).join(" ")
  const future = array.slice(index +1, array.length - 1).map(obj => obj.word).join(" ")

  $scrollingPast.empty();
  $scrollingCurrent.empty();
  $scrollingFuture.empty();
  $scrollingPast.append(past);
  $scrollingCurrent.append(array[index].word)
  $scrollingFuture.append(future);
}

// setup viewer function stuffs
stepper(testsring)

$('#pause-button').on('click', () => {
  PAUSED = !PAUSED
  !PAUSED && viewer()
})

$('#faster-button').on('click', () => {
  SPEED -= 25
})

$('#slower-button').on('click', () => {
  SPEED += 25
})
