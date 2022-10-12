'use strict'

const WALL = '#'
const FOOD = '.'
const EMPTY = ' '
const SUPER_FOOD = 'S'
const CHERRY = '🍒'

var gGame = {
    score: 0,
    isOn: false,
    isWon: false,
    eatcounter: 56,
    deadGhosts: [],

}
var gBoard
var gIntervalCherry

function init() {
    if(!gGame.isOn)  clearInterval(gIntervalGhosts)

    resetGameVaraiables()
    hideEndBtn()

    console.log('hello')

    gBoard = buildBoard()
    createPacman(gBoard)
    createGhosts(gBoard)
    
    renderBoard(gBoard, '.board-container')
    gIntervalCherry = setInterval(addCherry, 5000)

    
}

function buildBoard() {
    const SIZE = 10
    const board = []

    for (var i = 0; i < SIZE; i++) {
        board.push([])

        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD

            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL
            }

            if(i === 1 && j === 8 || i === 1 && j === 1 || 
                i === 8 && j === 1 || i === 8 && j === 8)
                board[i][j] = SUPER_FOOD

        }
    }
    return board
}

function updateScore(diff) {
    gGame.score += diff
    document.querySelector('h2 span').innerText = gGame.score
}

function gameOver() {
    // console.log('Game Over')
    gGame.isOn = false
    clearInterval(gIntervalGhosts)
    clearInterval(gIntervalCherry)
    displayEndBtn()
}

function displayEndBtn(){
    var elBtn = document.querySelector('button')
    elBtn.classList.remove('hide')
    //condition ? exprIfTrue : exprIfFalse
    elBtn.innerText = (gGame.isWon) ? 'YOU WON! PLAY AGAIN?' : 'YOU LOST! PLAY AGAIN?' 
}

function hideEndBtn(){
    var elBtn = document.querySelector('button')
    elBtn.classList.add('hide')
}

function resetGameVaraiables(){
    gGame.eatcounter = 56
    gGame.score = 0
    gGame.isOn = true
    gGame.isWon = false
}


function addCherry(){
    var randEmptyIdx = findRandEmptyCell()
    if(!randEmptyIdx)    return
    
    gBoard[randEmptyIdx.i][randEmptyIdx.j] = CHERRY

    renderCell(randEmptyIdx , CHERRY)
}