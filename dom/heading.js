console.log(document);
console.log(document.body);
const h1 = document.body.querySelector("#heading");
let name = prompt("What is your name?");
h1.textContent = "Hello, " + name + "!";
    
