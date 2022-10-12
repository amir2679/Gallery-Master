'use strict'

// NOTE: This is a global used only in the controller
var gLastRes = null

$(document).ready(init)
$('.btn-start').click(onStartGuessing)
$('.btn-yes').click({ ans: 'yes' }, onUserResponse)
$('.btn-no').click({ ans: 'no' }, onUserResponse)
$('.btn-add-guess').click(onAddGuess)

function init() {
  console.log('Started...')
  createQuestsTree()
}

function onStartGuessing() {
  // TODO: hide the game-start section
  $('.game-start').hide()

  renderQuest()
  // TODO: show the quest section
  $('.quest').show()
}

function renderQuest() {
  // TODO: select the <h2> inside quest and update
  // its text by the currQuest text
  $('.quest h2').text(getCurrQuest().txt)
}

function onUserResponse(ev) {
  var res = ev.data.ans
  // If this node has no children
  if (isChildless(getCurrQuest())) {
    if (res === 'yes') {
      // alert('Yes, I knew it!')
      $('.alert').text('Yes, I knew it!')
      $('.alert').removeClass('d-none')
      setTimeout(function () { $('.alert').addClass('d-none') }, 3000)
      $('.quest').hide()
      onRestartGame()
      // TODO: improve UX
    } else {
      // alert('I dont know...teach me!')
      $('.alert').text('I dont know...teach me!')
      $('.alert').removeClass('d-none')
      setTimeout(function () { $('.alert').addClass('d-none') }, 3000)
      // TODO: hide and show new-quest section
      $('.quest').hide()
      $('.new-quest').show()
    }
  } else {
    // TODO: update the lastRes global var
    gLastRes = res
    moveToNextQuest(res)
    renderQuest()
  }
}

function onAddGuess(ev) {
  ev.preventDefault()
  var newGuess = $('#newGuess').val().trim()
  var newQuest = $('#newQuest').val().trim()

  if(!newGuess || !newQuest)  return

  // TODO: Get the inputs' values
  // TODO: Call the service addGuess
  addGuess(newQuest, newGuess, gLastRes)

  onRestartGame()
}

function onRestartGame() {
  $('.new-quest').hide()
  $('.game-start').show()
  gLastRes = null

  init()
}
