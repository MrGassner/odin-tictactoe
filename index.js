const Gameboard =(() => {
    document.querySelector('.resetMenu').addEventListener('click', () => resetBoard())
    let gameboard = []
    const resetBoard = () => {
        gameboard.length = 0
        PlayGame.board.forEach(col => col.innerHTML = '')
        PlayGame.displayWinner('close')
    }
    const addToBoard = (player, index) => {
        if (!gameboard.find(key => key.index === index)) {
            gameboard.push({player, index});
            document.querySelector(`[data-index="${index}"]`).innerHTML = player
        }    
        PlayGame.checkWinner()    
    }
    return { gameboard, addToBoard, resetBoard}
})();

const Menu = (() => {
    let computerAI = false
    const homeBtn = document.querySelector('.homeMenu')
    const humanBtn = document.querySelector('.human')
    const computerBtn = document.querySelector('.computer')
    const homeDisplay = document.querySelector('.home')

    homeBtn.addEventListener('click', () => homeDisplay.style.display = 'block')

    humanBtn.addEventListener('click', () => {
        homeDisplay.style.display = 'none'
        Gameboard.resetBoard()
        PlayGame.displayWinner('close')
    })

    computerBtn.addEventListener('click', () => {
        homeDisplay.style.display = 'none'
        Gameboard.resetBoard()
        PlayGame.displayWinner('close')
    })

    return { homeDisplay, computerAI }
})();


const PlayGame = (() => {
    let x
    let endGame = false
    const playerX = 'X'
    const playerO = 'O'
    const board = document.querySelectorAll('.col')
    const reset = document.querySelector('.reset')
    const winnerDisplay = document.querySelector('.winnerDisplay')
    const winner = document.querySelector('.winner')
    const winConditions = [
        ['1', '2', '3'], 
        ['4', '5', '6'], 
        ['7', '8', '9'], 
        ['1', '4', '7'],
        ['2', '5', '8'],
        ['3', '6', '9'],
        ['1', '5', '9'],
        ['3', '5', '7']
    ]
    const checkWinner = () => {
        const board = Gameboard.gameboard
        const xBoard = []
        const oBoard = []

        board.filter(player => {
            if (player.player === 'X') {
                xBoard.push(player.index)
            }
        })

        board.filter(player => { 
            if (player.player === 'O') {
                oBoard.push(player.index)
            }
        })

        winConditions.forEach(condition => {
            const xWinner = condition.every(elem => xBoard.includes(elem));
            const oWinner = condition.every(elem => oBoard.includes(elem));
            if ((xWinner === true && endGame === false) || (oWinner === true && endGame === false)) {
                if (xWinner) {
                    displayWinner('x')
                    endGame = true
                }

                if (oWinner) {
                    displayWinner('o')
                    endGame = true
                }
            }

        })
        
        if (endGame === false && board.length === 9) displayWinner('tie')
        endGame = false
    };

    const displayWinner = won => {
        switch (won) {
            case 'o':
                winner.innerHTML = 'Winner O';
                break;
            case 'x':
                winner.innerHTML = 'Winner X';
                break;
            case 'tie':
                winner.innerHTML = 'Tied'
                break;
            default:
                x = ''
                return winnerDisplay.style.display = 'none'
        }
        if (winnerDisplay.style.display == 'none') {
            winnerDisplay.style.display = 'block' 
        } else {
            x = ''
            winnerDisplay.style.display = 'none'
        }  
    }

    const computerPlay = () => {
        let indexPlayed = Math.floor(Math.random() * 9) + 1
        while (Gameboard.gameboard.find(key => key.index === indexPlayed.toString())) {
            indexPlayed = Math.floor(Math.random() * 9) + 1
        }
        Gameboard.addToBoard(playerO, indexPlayed.toString()) 
    }
    
    board.forEach(sqr => {
        sqr.addEventListener('click', event => {
            if (Gameboard.gameboard.find(key => key.index === event.target.dataset.index)) {
                return
            }
            if (x = !x) {
                Gameboard.addToBoard(playerX, event.target.dataset.index)
                if (Menu.computerAI === true) {
                    if (Gameboard.gameboard.length !== 9) {
                        computerPlay()
                    }
                    x = ''
                }
            } else {
                Gameboard.addToBoard(playerO, event.target.dataset.index)              
            }
        })
    })

    reset.addEventListener('click', () => {
        displayWinner('close')
        Gameboard.resetBoard()
    })
    return { board, displayWinner, checkWinner }
})();
