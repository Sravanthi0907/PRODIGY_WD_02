document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('game-board');
    const cells = Array.from(document.querySelectorAll('.cell'));
    const restartButton = document.getElementById('restartButton');
    const gameModeSelect = document.getElementById('gameMode');

    let currentPlayer = 'X';
    let gameActive = true;
    const boardState = Array(9).fill(null);

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleCellClick(event) {
        const cell = event.target;
        const cellIndex = cells.indexOf(cell);

        if (boardState[cellIndex] !== null || !gameActive) {
            return;
        }

        updateCell(cell, cellIndex);
        checkResult();
        if (gameModeSelect.value === 'computer' && gameActive) {
            setTimeout(computerMove, 500);
        }
    }

    function updateCell(cell, index) {
        boardState[index] = currentPlayer;
        cell.classList.add(currentPlayer);
        cell.textContent = currentPlayer;
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }

    function checkResult() {
        let roundWon = false;
        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            gameActive = false;
            setTimeout(() => alert(`Player ${currentPlayer === 'X' ? 'O' : 'X'} wins!`), 100);
            setTimeout(restartGame, 1500);
            return;
        }

        if (!boardState.includes(null)) {
            gameActive = false;
            setTimeout(() => alert('Draw!'), 100);
            setTimeout(restartGame, 1500);
            return;
        }
    }

    function computerMove() {
        const availableCells = boardState.map((cell, index) => (cell === null ? index : null)).filter(index => index !== null);
        const randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
        const cell = cells[randomIndex];
        updateCell(cell, randomIndex);
        checkResult();
    }

    function restartGame() {
        currentPlayer = 'X';
        gameActive = true;
        boardState.fill(null);
        cells.forEach(cell => {
            cell.classList.remove('X', 'O');
            cell.textContent = '';
        });
    }

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    restartButton.addEventListener('click', restartGame);
});
