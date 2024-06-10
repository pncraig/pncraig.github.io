
const startGameButton = document.getElementById("start-game-button");

startGameButton.addEventListener("click", createBoard);

createBoard();

function createBoard() {
  // Create the table element
  const table = document.createElement("table");
  // Create the body for the table
  const tableBody = document.createElement("tbody");

  // Create the tic tac toe board
  for (var i = 0; i < 3; i++) {
    const tableRow = document.createElement("tr");
    for (var j = 0; j < 3; j++) {
      tableRow.appendChild(createCell());
    }
    tableBody.appendChild(tableRow);
  }
}

function createCell() {
  // Create an input element that is of type "button"
  const button = document.createElement("input");
  button.setAttribute("type", "button");

  // Wrap the button in a tabular data element
  const tabularData = document.createElement("td");
  tabularData.appendChild(button);

  return tabularData;
}
