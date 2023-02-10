const Gameboard =(() => {
    let gameboard = []
    const resetBoard = () => {
        gameboard.length = 0
        PlayGame.board.forEach(col => col.innerHTML = '')
    }
    const addToBoard = (player, index) => {
        if (!gameboard.find(key => key.index === index)) {
            gameboard.push({player, index});
            document.querySelector(`[data-index="${index}"]`).innerHTML = player
        }        
    }

    return { gameboard, addToBoard, resetBoard}
})();

const PlayGame = (() => {
    let x;
    const playerX = 'X'
    const playerO = 'O'
    const board = document.querySelectorAll('.col')
    const reset = document.querySelector('.reset')
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

            if (xWinner) displayWinner(false)
            if (oWinner) displayWinner(true)
        })
    };

    const displayWinner = won => {
        const winnerDisplay = document.querySelector('.winnerDisplay')
        const winner = document.querySelector('.winner')

        if (won)  { 
            winner.innerHTML = 'Winner O'
        } else {
            winner.innerHTML = 'Winner X'
        }
        
        if (winnerDisplay.style.display == 'none') {
            winnerDisplay.style.display = 'block' 
        } else {
            winnerDisplay.style.display = 'none'
        }  
    }
    
    board.forEach(sqr => {
        sqr.addEventListener('click', event => {
            if (x = !x) {
                Gameboard.addToBoard(playerX, event.target.dataset.index)

            } else {
                Gameboard.addToBoard(playerO, event.target.dataset.index)
            }

            checkWinner()
        })
    })

    reset.addEventListener('click', () => {
        displayWinner(false)
        Gameboard.resetBoard()
        x = ''
    })

    return { board }
})();
