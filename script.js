const Gameboard = (function() {
    const rows = 3;
    const columns = 3;
    const boardArr = [];

    for(let i = 0; i < rows; i++){
        boardArr[i] = [];
        for(let j = 0; j < columns; j++){
            boardArr[i].push(Cell()); 
        };
    };

    const board = () => boardArr;

    // finding the empty cells
    const printSign = (i, j, player) => {
        const cell = boardArr[i][j];
        if(cell.getValue() !== 0) return;

        
        cell.addSign(player);
    };

    const printBoard = () => {
        const boardWithCellValues = boardArr.map((row) => row.map((cell) => cell.getValue()));
        console.log(boardWithCellValues);
      };

    return{
        board,
        printSign,
        printBoard
    };
})();

// a factory to make cells
function Cell() {
    let value = 0;

    const addSign = (player) => {
        value = player;
    };

    const getValue = () => value;

    return{
        addSign,
        getValue
    };
}

//contorlling game flow
function Gameflow(
    player1 = "bashar",
     player2 = "marco"
) {
    const players = [
        {
            name: player1,
            sign: "X"
        },
        {
            name: player2,
            sign: "O"
        }
    ];
    let playerInHand = players[0];
    const changePlayer = () => {
        playerInHand = (playerInHand === players[0])?players[1]:
        players[0];
    };
    const getPlayerInHand = () => playerInHand;

    const playNewRound = () => {
        Gameboard.printBoard();
        console.log(`${getPlayerInHand().name}'s turn.`);
    };

    //the win function

    const checkWin = (row, col, sign) => {
        const board = Gameboard.board();

        //check row 
        if(board[row].every(cell => cell.getValue() === sign))
        return true;
        
        //check col
        if(board.every(r => r[col].getValue() === sign)) 
        return true;

        //check diagonal
        if(row === col && [0, 1, 2].every(i => board[i][i].getValue()) === sign)
        return true;
        
        // check rev diagonal
        if(row + col === 2 && [0, 1, 2].every(i => board[i][2 - i].getValue()) === sign)
        return true;

        return false;
    };

    const playRound = (row, column) => {
        console.log(
            `printing ${getPlayerInHand().name}'s sign into ${[row]} ${[column]} index`
        );
        Gameboard.printSign(row, column, getPlayerInHand().sign);
        
        // indecating win status
        if(checkWin(row, column, getPlayerInHand().sign)) {
            console.log(`${getPlayerInHand().name}'s WIN`);
            return;
        };
        changePlayer();
        playNewRound();
    };
    playNewRound();
    
    return {
        playRound,
        getPlayerInHand,
    };
}



const DisplayControllar = (function () {
    // starting the game 
    const start = document.getElementById("start");
    document.addEventListener("click", () => {
        Gameflow();
    });

    // waiting for a move
    const box = document.getElementsByClassName("board");
    
    document.addEventListener("click", function() {
        const sign = document.createElement("p");
        sign.textContent = `${game.getPlayerInHand().sign}`;
        console.log(`${game.getPlayerInHand().sign}`);
    });
})();




