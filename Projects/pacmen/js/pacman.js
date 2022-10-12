'use strict'

const PACMAN = '😷';
var gPacman;

function createPacman(board) {
    gPacman = {
        location: {
            i: 3,
            j: 5
        },
        isSuper: false
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
}

function movePacman(ev) {

    if (!gGame.isOn) return
    // console.log('ev', ev);
    const nextLocation = getNextLocation(ev)

    if (!nextLocation) return
    // console.log('nextLocation', nextLocation)

    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    // console.log('NEXT CELL', nextCell)

    // if (nextCell === WALL) return
    // if (nextCell === FOOD){ 
    //     updateScore(1)
    //     gGame.eatcounter--
    //     if(gGame.eatcounter === 0){
    //         gGame.isWon = true
    //         gameOver()
    //     }
    // }
    // else if (nextCell === GHOST) {
    //     gameOver()
    //     renderCell(gPacman.location, EMPTY)
    //     return
    // }

    switch (nextCell) {
        case WALL:
            return
            break
        case CHERRY:
            updateScore(10)
            break
        case FOOD:
            if (gGame.eatcounter === 0) {
                gGame.isWon = true
                gameOver()
            }
            updateScore(1)
            gGame.eatcounter--
            break
        case GHOST:
            if (gPacman.isSuper) {
                killGhost(nextLocation)

            }
            else {
                gameOver()
                renderCell(gPacman.location, EMPTY)
                return
            }
            break
        case SUPER_FOOD:
            if(gPacman.isSuper) return
            gPacman.isSuper = true
            gGame.deadGhosts = []
            setTimeout(() => {
                gPacman.isSuper = false; 
                gGhosts = [...gGhosts, ...gGame.deadGhosts]; 
                // for(var i =0; i< gGhosts.length; i++){

                // }
            }, 5000)      
    }



    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY

    // update the DOM
    renderCell(gPacman.location, EMPTY)

    // update the model
    gPacman.location = nextLocation
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN

    // update the DOM
    renderCell(gPacman.location, PACMAN)
}

function getNextLocation(eventKeyboard) {
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    switch (eventKeyboard.code) {
        case 'ArrowUp':
            nextLocation.i--;
            break;
        case 'ArrowDown':
            nextLocation.i++;
            break;
        case 'ArrowLeft':
            nextLocation.j--;
            break;
        case 'ArrowRight':
            nextLocation.j++;
            break;
        default:
            return null;
    }
    return nextLocation;
}
