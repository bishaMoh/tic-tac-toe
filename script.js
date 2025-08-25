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
        const availableBox = boardArr.filter((row) =>
        row[j].getValue() === 0).map(row => row[j]);

        //if there is no cell available
        if(!availableBox.length) return;
        
        board[i][availableBox].addSign(player);
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
        playerInHand = players[0]?players[1]:
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


