function addItem() {
  // Get the ordered list element
  const ol = document.getElementById("ordered-list");
  // Create a new list element to hold another item
  const li = document.createElement("li");
  // Access the text field element
  const textField = document.getElementById("text-field");
  // Get the text in the text field, which is stored in the "value" attribute
  const item = textField.getAttribute("value");
  // Create a new text node that will become a child of the new list element
  const textNode = document.createTextNode(item);
  // Add the text node as the child of the list element
  li.appendChild(textNode);
  // Append the list item to the ordered list
  ol.appendChild(li);
}
