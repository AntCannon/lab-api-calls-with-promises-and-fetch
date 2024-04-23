// get card section
const main = document.querySelector("main")

// add error section
const body = document.querySelector("body")
const errors = document.createElement("div")
errors.classList.add("errors")
body.appendChild(errors)

// get form
const form = document.querySelector("form")

// add select form difficulty
const select = document.createElement("select")
select.setAttribute("id", "difficulty")
select.setAttribute("name", "difficulty")
select.setAttribute("value", "")

// add options
const difficulties = [
  ["", "--Select Difficulty--"],
  ["easy", "Easy"],
  ["medium", "Medium"], 
  ["hard", "Hard"]
]
for (let [val, disp] of difficulties) {
  const option = document.createElement("option")
  option.setAttribute("value", val)
  option.innerText = disp
  select.appendChild(option)
}

// add to form
form.prepend(select)

// fetch and display trivia questions

form.addEventListener("submit", (e) => {
  e.preventDefault();

  fetch("https://opentdb.com/api.php?amount=10")
    .then((response) => response.json())
    .then((data) => {
      console.log(data.results);
      main.innerHTML = createTriviaCards(data.results);
      addShowAnswerListener();
    })
    .catch((error) => {
      console.error(error)
      document.querySelector(".errors")
        .innerHTML = error
    })
})

// helper function - create trivia questions
function createTriviaCards(questions) {
  
  const fullHTML = questions.map(question => (
    `<article class="card">
      <h2>${question.category}</h2>
      <p>${question.question}</p>
      <button>Show Answer</button>
      <p class="hidden">${question.correct_answer}</p>
    </article>`
  )).join("")
  return fullHTML
}

// helper add show answer listeners
function addShowAnswerListener() {
  const showAnswerButtons = document.querySelectorAll("main button")
  for (let button of showAnswerButtons) {
    button.addEventListener('click', (e) => {
      const answer = e.target.nextElementSibling
      answer.classList.toggle("hidden")
    })
  }
}