var isXsTurn = false;
const PLAYER_CHAR = "X";
const CPU_CHAR = "O";
const EMPTY_CHAR = " ";

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
  button.setAttribute("value", EMPTY_CHAR);

  // This function is called when the buttons are clicked.
  //  Only the human player can click a button, so put a 
  // PLAYER_CHAR in that spot
  function cellClicked() {
    // Let the player make their move
    button.setAttribute("value", PLAYER_CHAR);
    if (checkBoard(boardToArray(), PLAYER_CHAR) {
      resetVictoryMessage();
      setVictoryMessage(PLAYER_CHAR);
      createBoard();
      return;
    }
    // Call the cpu to make its move
    cpuMove();
    if (checkBoard(boardToArray(), CPU_CHAR)) {
      resetVictoryMessage();
      setVictoryMessage(CPU_CHAR);
      createBoard();
      return;
    }
  }

  // Add cellClicked() and cellPickedByCpu() as event listeners for the button
  button.addEventListener("click", cellClicked);
  
  // Wrap the button in a tabular data element
  const tabularData = document.createElement("td");
  tabularData.appendChild(button);

  return tabularData;
}

// Check if a player has three in a row
function checkBoard(snapshot, playerChar) {
  let row = playerChar + playerChar + playerChar;
  // Check rows
  for (let r = 0; r < 3; r++) {
    if ((snapshot[r][0] + snapshot[r][1] + snapshot[r][2]) === row) {
      return true;
    }
  }

  // Check columns
  for (let c = 0; c < 3; c++) {
    if ((snapshot[0][c] + snapshot[1][c] + snapshot[2][c]) === row) {
      return true;
    }
  }

  // Check diagonals
  return (snapshot[0][0] + snapshot[1][1] + snapshot[2][2]) === row ||
         (snapshot[0][2] + snapshot[1][1] + snapshot[2][0]) === row;
}

// Function that chooses where the cpu will play
function cpuMove() {
  let row = 0;
  let col = 0;
  let maxScore = -Infinity;
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      if (isCellUnoccupied(boardToArray(), r, c)) {
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
  console.log({"row": row, "col": col, "score": maxScore});
  document.getElementById(row + "-" + col).setAttribute("value", CPU_CHAR);
}

function evaluateBoard(board, currentPlayer, nextPlayer, mainPlayer) {
  let mainPlayerWon = checkBoard(board, mainPlayer);
  let currentPlayerWon = checkBoard(board, currentPlayer);
  let boardFull = isBoardFull(board);

  if (mainPlayerWon) {
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
      if (isCellUnoccupied(board, r, c)) {
        let newBoard = board.map((arr) => arr.slice());
        newBoard[r][c] = currentPlayer;
        score += evaluateBoard(newBoard, nextPlayer, currentPlayer, mainPlayer);
      }
    }
  }

  return score;
}

// Get the value of a cell at a specific location
function getCellValue(row, column) {
  return document.getElementById(row + "-" + column).getAttribute("value");
}

// Returns true if the cell is unoccupied, false otherwise
function isCellUnoccupied(snapshot, row, column) {
  return snapshot[row][column] == EMPTY_CHAR;
}

// Returns true if the board is completely full
function isBoardFull(snapshot) {
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      if (snapshot[r][c] == EMPTY_CHAR) {
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

function setVictoryMessage(char) {
  const victoryMessage = document.createTextNode("Player " + char + " won!!");
  const h2 = document.createElement("h2");
  h2.setAttribute("id", "victory-message");
  h2.appendChild(victoryMessage);
  document.body.appendChild(h2);
}

function resetVictoryMessage() {
  const victoryMessage = document.getElementById("victory-message");
  victoryMessage.remove();
}
