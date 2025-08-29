// ==== GAMEBOARD MODULE ====
const Gameboard = (function () {
    const rows = 3;
    const columns = 3;
    let boardArr = [];

    const init = () => {
        boardArr = [];
        for (let i = 0; i < rows; i++) {
            boardArr[i] = [];
            for (let j = 0; j < columns; j++) {
                boardArr[i].push(Cell());
            }
        }
    };

    init();

    const board = () => boardArr;

    const printSign = (i, j, player) => {
        const cell = boardArr[i][j];
        if (cell.getValue() !== 0) return;
        cell.addSign(player);
    };

    const resetBoard = () => {
        init();
    };

    return {
        board,
        printSign,
        resetBoard
    };
})();

// ==== CELL FACTORY ====
function Cell() {
    let value = 0;

    const addSign = (player) => {
        value = player;
    };

    const getValue = () => value;

    return {
        addSign,
        getValue
    };
}

// ==== GAMEFLOW ====
function Gameflow(player1 = "P1", player2 = "P2") {
    const players = [
        { name: player1, sign: "X" },
        { name: player2, sign: "O" }
    ];

    let playerInHand = players[0];
    let gameOver = false;

    const changePlayer = () => {
        playerInHand = (playerInHand === players[0]) ? players[1] : players[0];
    };

    const getPlayerInHand = () => playerInHand;
    const isGameOver = () => gameOver;

    const checkWin = (row, col, sign) => {
        const board = Gameboard.board();

        // row
        if (board[row].every(cell => cell.getValue() === sign)) return true;
        // col
        if (board.every(r => r[col].getValue() === sign)) return true;
        // main diagonal
        if (row === col && [0,1,2].every(i => board[i][i].getValue() === sign)) return true;
        // reverse diagonal
        if (row + col === 2 && [0,1,2].every(i => board[i][2 - i].getValue() === sign)) return true;

        return false;
    };

    const playRound = (row, column) => {
        if (gameOver) return;

        Gameboard.printSign(row, column, getPlayerInHand().sign);

        if (checkWin(row, column, getPlayerInHand().sign)) {
            gameOver = true;
            return { winner: getPlayerInHand() };
        }

        changePlayer();
        return { winner: null };
    };

    return {
        playRound,
        getPlayerInHand,
        isGameOver
    };
}

// ==== DISPLAY CONTROLLER ====
const DisplayController = (function () {
    let game;

    const statusDiv = document.getElementById("status");
    const cells = document.querySelectorAll(".board");
    const startBtn = document.getElementById("start");
    const restartBtn = document.getElementById("restart");

    const renderBoard = () => {
        const board = Gameboard.board();
        cells.forEach(cell => {
            const row = cell.dataset.row;
            const col = cell.dataset.col;
            const value = board[row][col].getValue();
            cell.textContent = value === 0 ? "" : value;
        });

        if (game) {
            if (game.isGameOver()) {
                statusDiv.textContent = `${game.getPlayerInHand().name} WINS! 🎉`;
            } else {
                statusDiv.textContent = `${game.getPlayerInHand().name}'s turn (${game.getPlayerInHand().sign})`;
            }
        }
    };

    // add click listeners to board cells
    cells.forEach(cell => {
        cell.addEventListener("click", () => {
            if (!game || game.isGameOver()) return;

            const row = parseInt(cell.dataset.row);
            const col = parseInt(cell.dataset.col);

            if (Gameboard.board()[row][col].getValue() !== 0) return;

            const result = game.playRound(row, col);
            renderBoard();

            if (result.winner) {
                statusDiv.textContent = `${result.winner.name} WINS! 🎉`;
            }
        });
    });

    startBtn.addEventListener("click", () => {
        Gameboard.resetBoard();
        game = Gameflow();
        renderBoard();
        statusDiv.textContent = "Game started!";
    });

    restartBtn.addEventListener("click", () => {
        Gameboard.resetBoard();
        game = Gameflow();
        renderBoard();
        statusDiv.textContent = "Game restarted!";
    });

    return { renderBoard };
})();
