var isXsTurn = false;
var tttBoard = getBoardArray();

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
    tttBoard = getBoardArray();
  }
  
  // Create the table element
  const table = document.createElement("table");
  // Create the body for the table
  const tableBody = document.createElement("tbody");

  // Create the tic tac toe board
  for (var i = 0; i < 3; i++) {
    const tableRow = document.createElement("tr");
    for (var j = 0; j < 3; j++) {
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
  // Create an input element that is of type "button"
  const button = document.createElement("input");
  button.setAttribute("type", "button");
  button.setAttribute("value", " ");

  // This function is called when the buttons are clicked.
  // They change the character that is displayed
  function cellClicked() {
    if (isXsTurn) {
      button.setAttribute("value", "X");
      tttBoard[row][column] = "X";
      isXsTurn = false;
    } else {
      button.setAttribute("value", "O");
      tttBoard[row][column] = "O";
      isXsTurn = true;
    }
  }

  // Add cellClicked() as an event listener for the button
  button.addEventListener("click", cellClicked);

  // Wrap the button in a tabular data element
  const tabularData = document.createElement("td");
  tabularData.appendChild(button);

  return tabularData;
}

// Check if a player has three in a row
function checkBoard(playerChar) {
  
}

// Get a 2d array representing an empty board
function getBoardArray() {
  return [
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "]
  ];
}
