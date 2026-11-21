export function textAppear() {
    const input = document.getElementById("userInput");
const display = document.getElementById("displayText");

input.addEventListener("input", function() {
    display.textContent = input.value;
    display.style.fontSize = "50px";
})};