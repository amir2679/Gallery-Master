'use strict'

function renderBoard(mat, selector) {

    var strHTML = '<table border="0"><tbody>'
    for (var i = 0; i < mat.length; i++) {

        strHTML += '<tr>'
        for (var j = 0; j < mat[0].length; j++) {

            const cell = mat[i][j]
            const className = 'cell cell-' + i + '-' + j
            strHTML += `<td class="${className}">${cell}</td>`
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>'
    
    const elContainer = document.querySelector(selector)
    elContainer.innerHTML = strHTML
}

// location such as: {i: 2, j: 7}
function renderCell(location, value) {
    // Select the elCell and set the value
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    elCell.innerHTML = value
}

function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}


function getRandomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

function findRandEmptyCell(){
    var emptyCells = []
    
    for(var i = 0 ; i< gBoard.length ; i++){
        for(var j = 0 ; j < gBoard[i].length ; j++){
            if(gBoard[i][j] === EMPTY)
                emptyCells.push({i,j})
        }
    }
    var randIdx = getRandomIntInclusive(0 , emptyCells.length -1)
    return emptyCells[randIdx]
}

