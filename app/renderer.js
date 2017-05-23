const electron = require('electron');
const $ = require('jquery');

const $viewer = $('.viewer')

const test = `The sky above. the port. was the color. of television, tuned
to a dead channel.
"It's not like I'm using," Case heard someone say, as he shouldered his way through the crowd around the door of the Chat.`

let SPEED = 100
let spewing = false

const splitter = (string) => {
  const array = string.split(" ")

  return array.map( word => {
    const result = { word, punctuation: false }
    if (word.indexOf('.') > 0) {

      result.punctuation = true
    }

    return result
  })
}

const steper = (string) => {
  const array = splitter(string);
  let end = array.length - 1
  let currentWord = 0
  spewing = true

  const viewer = (word) => {
    // console.log(currentWord, word);
    if(currentWord<end){
      currentWord++

      let wordObject = array[currentWord]
      if (array[currentWord - 1].punctuation) {
        console.log(wordObject, 'WAIT! IT a period')
        setTimeout(() => {viewer(wordObject.word)}, SPEED + 100)

      } else {
        setTimeout(() => {viewer(wordObject.word)}, SPEED)
      }

    } else {
      //
    }
    $viewer.empty()
    $viewer.append(word)
  }

  // if (notPaused) {}
  viewer(array[currentWord])
}


$('#play-button').on('click', () => {
  // $('textarea').val()
  steper($('textarea').val() || test)
})

$('#pause-button').on('click', () => {
  console.log('PAUSE IT')
})

$('#faster-button').on('click', () => {
  console.log('FASTER')
  SPEED -= 25

})

$('#slower-button').on('click', () => {
  console.log('SLOWER')
  SPEED += 25
})
