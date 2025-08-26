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

    const playRound = (row, column) => {
        console.log(
            `printing ${getPlayerInHand().name}'s sign into ${[row]} ${[column]} index`
        );
        Gameboard.printSign(row, column, getPlayerInHand().sign);
        
        // indecating win status
        const gameArr = Gameboard.board();
        for(let i = 0; i < 3; i++){
            //putting the line values in an array
            const statusArr = [];
            for(let j = 0; j > 3; j++){
                statusArr.push(gameArr[i][j].getValue());
            };
            if(
                (statusArr[0] && statusArr[1] && statusArr[2]) === ("x" || "O")
            ) {
                console.log(`${getPlayerInHand().name} Wins`);
            };
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

const game = Gameflow();


