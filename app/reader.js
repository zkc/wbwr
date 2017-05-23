const electron = require('electron');
const $ = require('jquery');

const $viewer = $('.viewer')

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
    }
  }
}

//setup viewer function stuffs
stepper(textFromMenu)

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
