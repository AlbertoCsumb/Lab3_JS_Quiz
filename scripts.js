/* Alberto Rodrigues
  Lab 3 - JS Quiz
  09/29/2025
*/


console.log("Hello, World!");

const submitButton = document.querySelector("#submit");
const a1Message = document.querySelector("#a1-result");
const a2Message = document.querySelector("#a2-result");
const a3Message = document.querySelector("#a3-result");
const a4Message = document.querySelector("#a4-result");
const a5Message = document.querySelector("#a5-result");

function resetFeedback() {
  document.querySelectorAll(".result").forEach(p => {
    p.textContent = "";
    p.style.backgroundColor = "";
  });
  document.querySelectorAll(".icon").forEach(img => img.hidden = true);
}

function showIcon(id, isCorrect) {
  const img = document.querySelector(`#${id}-icon`);
  img.src = isCorrect ? "check.png" : "x.png";
  img.alt = isCorrect ? "Correct" : "Incorrect";
  img.hidden = false;
}

function shuffleChildren(container) {
  const items = Array.from(container.children);
  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }
  items.forEach(item => container.appendChild(item));
}

shuffleChildren(document.querySelector("#q2-options"));

// Randomize radio (DOTS) options (run once)
const q2Options = document.querySelector("#q2-options");
if (q2Options) shuffleChildren(q2Options);

function updateAttempts() {
  const key = "quizAttempts";
  const current = Number(localStorage.getItem(key) || 0) + 1;
  localStorage.setItem(key, String(current));
  document.querySelector("#attempts").textContent = `Total times taken: ${current}`;
}

// localStorage init and display
(function initAttempts() {
  const key = "quizAttempts";
  const current = Number(localStorage.getItem(key) || 0);
  const el = document.querySelector("#attempts");
  if (el) el.textContent = `Total times taken: ${current}`;
})();

submitButton.addEventListener("click", function () {
  resetFeedback();
  let score = 0;

  // Q1 (free text)
  const answer1Raw = document.querySelector("#a1").value.trim();
  const isGreenText = answer1Raw.toLowerCase() === "green";
  a1Message.textContent = isGreenText ? "Correct!" : "Incorrect, the correct answer is Green.";
  a1Message.style.backgroundColor = isGreenText ? "lightgreen" : "red";
  showIcon("a1", isGreenText);
  if (isGreenText) score += 20;

  // Q2 (radio)
  const radiosChecked = document.querySelectorAll('input[name="colors"]:checked');
  const pickedGreenRadio = Array.from(radiosChecked).some(i => i.value === "Green");
  a2Message.textContent = pickedGreenRadio ? "Correct!" : "Incorrect, the correct answer is Green.";
  a2Message.style.backgroundColor = pickedGreenRadio ? "lightgreen" : "red";
  showIcon("a2", pickedGreenRadio);
  if (pickedGreenRadio) score += 20;

  // Q3 (checkboxes)
  const checkboxesChecked = document.querySelectorAll('input[type="checkbox"]:checked');
  const pickedGreenCheckbox = Array.from(checkboxesChecked).some(i => i.value === "Green" && checkboxesChecked.length === 1);
  a3Message.textContent = pickedGreenCheckbox ? "Correct!" : "Incorrect, the correct answer is Green only.";
  a3Message.style.backgroundColor = pickedGreenCheckbox ? "lightgreen" : "red";
  showIcon("a3", pickedGreenCheckbox);
  if (pickedGreenCheckbox) score += 20;

  // Q4 (number)
  const answer4Number = Number(document.querySelector("#a4").value.trim());
  const isCorrectNumber = answer4Number === 3;
  a4Message.textContent = isCorrectNumber ? "Correct!" : "Incorrect, the correct answer is 3.";
  a4Message.style.backgroundColor = isCorrectNumber ? "lightgreen" : "red";
  showIcon("a4", isCorrectNumber);
  if (isCorrectNumber) score += 20;

  // Q5 (select)
  const answer5 = document.querySelector("#a5").value;
  const isCorrectSelect = answer5 === "Green";
  a5Message.textContent = isCorrectSelect ? "Correct!" : "Incorrect, the correct answer is Green.";
  a5Message.style.backgroundColor = isCorrectSelect ? "lightgreen" : "red";
  showIcon("a5", isCorrectSelect);
  if (isCorrectSelect) score += 20;

  if (score > 80) {
    alert("GOOD! You scored above 80!");
  }
  alert(`Your score is ${score}/100`);

  updateAttempts();
});

