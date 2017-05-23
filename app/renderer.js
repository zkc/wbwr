const electron = require('electron');
const $ = require('jquery');

const $viewer = $('.viewer')

const test = `The sky above. the port. was the color. of television, tuned
to a dead channel.
"It's not like I'm using," Case heard someone say, as he shouldered his way through the crowd around the door of the Chat.`

const SPEED = 200
let spewing = false

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
  viewer(array[currentWord])
}


$('button').on('click', () => {
  // $('textarea').val()
  steper(  test)

})
