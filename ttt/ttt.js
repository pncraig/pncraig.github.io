var isXsTurn = false;
const PLAYER_CHAR = "X";
const CPU_CHAR = "O";

// Add event handler to the "start game button" so that every time
// the button is clicked, a new game is started
const startGameButton = document.getElementById("start-game-button");
startGameButton.addEventListener("click", createBoard);

// Create a new tic tac toe board to start off
createBoard();

// Create a whole new tic tac toe board
function createBoard() {
  // Remove a board if it already exists
  const oldBoard = document.getElementsByTagName("table");
  if (oldBoard.length != 0) {
    oldBoard[0].remove();
  }
  
  // Create the table element
  const table = document.createElement("table");
  // Create the body for the table
  const tableBody = document.createElement("tbody");

  // Create the tic tac toe board
  for (let i = 0; i < 3; i++) {
    const tableRow = document.createElement("tr");
    for (let j = 0; j < 3; j++) {
      tableRow.appendChild(createCell(i, j));
    }
    tableBody.appendChild(tableRow);
  }

  // Append the table to the document body
  table.appendChild(tableBody);
  document.body.appendChild(table);
}

// Create a single square on the tic tac toe board
function createCell(row, column) {
  // Create an input element that is of type "button". The element
  // has an id corresponding to its position on the board for easy access
  const button = document.createElement("input");
  button.setAttribute("id", row + "-" + column);
  button.setAttribute("type", "button");
  button.setAttribute("value", " ");

  // This function is called when the buttons are clicked.
  //  Only the human player can click a button, so put a 
  // PLAYER_CHAR in that spot
  function cellClicked() {
    button.setAttribute("value", PLAYER_CHAR);
    // Call the cpu to make its move
    cpuMove();
  }

  // Add cellClicked() and cellPickedByCpu() as event listeners for the button
  button.addEventListener("click", cellClicked);
  
  // Wrap the button in a tabular data element
  const tabularData = document.createElement("td");
  tabularData.appendChild(button);

  return tabularData;
}

// Check if a player has three in a row
function checkBoard(playerChar) {
  let row = playerChar + playerChar + playerChar;
  // Check rows
  for (let r = 0; r < 3; r++) {
    if ((getCellValue(r, 0) + getCellValue(r, 1) + getCellValue(r, 2)) === row) {
      return true;
    }
  }

  // Check columns
  for (let c = 0; c < 3; c++) {
    if ((getCellValue(0, c) + getCellValue(1, c) + getCellValue(1, c)) === row) {
      return true;
    }
  }

  // Check diagonals
  return (getCellValue(0, 0) + getCellValue(1, 1) + getCellValue(2, 2)) === row ||
         (getCellValue(0, 2) + getCellValue(1, 1) + getCellValue(2, 0)) === row;
}

// Function that chooses where the cpu will play
function cpuMove() {
  let row;
  let col;
  let maxScore = -Infinity;
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      if (isCellUnoccupied(r, c)) {
        let board = boardToArray();
        board[r][c] = CPU_CHAR;
        let score = evaluateBoard(board, CPU_CHAR, PLAYER_CHAR, CPU_CHAR);
        if (score > maxScore) {
          row = r;
          col = c;
          maxScore = score;
        }
      }
    }
  }
  document.getElementById(row + "-" + col).setAttribute("value", CPU_CHAR);
}

function evaluateBoard(board, currentPlayer, nextPlayer, mainPlayer) {
  let mainPlayerWon = checkBoard(mainPlayer);
  let currentPlayerWon = checkBoard(currentPlayer);
  let boardFull = isBoardFull();

  if (mainPlayerWon || (currentPlayer == mainPlayer && currentPlayerWon)) {
      return 1;
  }

  if (currentPlayerWon) {
    return -1;
  }

  if (boardFull) {
    return 0;
  }
  
  let score = 0;
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      if (board[r][c] == " ") {
        let newBoard = board.map((arr) => arr.slice());
        console.log(newBoard);
        newBoard[r][c] = currentPlayer;
        score += evaluateBoard(newBoard, nextPlayer, currentPlayer, mainPlayer);
      }
    }
  }
}

// Get the value of a cell at a specific location
function getCellValue(row, column) {
  return document.getElementById(row + "-" + column).getAttribute("value");
}

// Returns true if the cell is unoccupied, false otherwise
function isCellUnoccupied(row, column) {
  return getCellValue(row, column) == " ";
}

// Returns true if the board is completely full
function isBoardFull() {
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      if (getCellValue(r, c) == " ") {
        return false;
      }
    }
  }
  return true;
}

// Returns the tic tac toe board as a 2d array of characters
function boardToArray() {
  let board = [];
  for (let r = 0; r < 3; r++) {
    board.push([]);
    for (let c = 0; c < 3; c++) {
      board[r].push(getCellValue(r, c));
    }
  }
  return board;
}
