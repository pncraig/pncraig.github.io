// Get the submit button
const button = document.getElementById("button");
// Add the addItem() function as the event handler for the button
button.addEventListener("click", addItem);

// Function that adds a new item to the todo list
// when the button is pressed
function addItem() {
  // Get the ordered list element
  const ol = document.getElementById("unordered-list");
  // Create a new list element to hold another item
  const li = document.createElement("li");
  // Access the text field element
  const textField = document.getElementById("text-field");
  // Get the text in the text field, which is stored in the "value" attribute
  const item = textField.value;
  // Create a new text node that will become a child of the new list element
  const textNode = document.createTextNode(item);

  // Function that removes an item from the todo list
  // when the checkbox is checked
  function checkOffItem() {
    li.remove();
  }

  // Create a checkbox input element
  const check = document.createElement("input");
  check.setAttribute("type", "checkbox");
  check.addEventListener("input", checkOffItem);
  
  // Add the checkbox as a child of the list element
  li.appendChild(check);
  // Add the text node as the child of the list element
  li.appendChild(textNode);
  // Append the list item to the ordered list
  ol.appendChild(li);
  // Erase the text field
  textField.value = "";
}
