// get card section
const main = document.querySelector("main")

// add error section
const body = document.querySelector("body")
const errors = document.createElement("div")
errors.classList.add("errors")
body.appendChild(errors)

// get form
const form = document.querySelector("form")

// add user options div
const questionOptions = document.createElement("div")
questionOptions.classList.add("questionOptions")

// add select form difficulty
const selectDifficulty = document.createElement("select")
selectDifficulty.setAttribute("id", "difficulty")
selectDifficulty.setAttribute("name", "difficulty")
selectDifficulty.setAttribute("value", "")
questionOptions.appendChild(selectDifficulty)

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
  selectDifficulty.appendChild(option)
}

// add select category
const selectCategory = document.createElement("select")
selectCategory.setAttribute("id", "category")
selectCategory.setAttribute("name", "category")
selectCategory.setAttribute("value", "")
questionOptions.appendChild(selectCategory)

// add options

const categoriesArr = [
  {
    "id": 9,
    "name": "General Knowledge"
  },
  {
    "id": 10,
    "name": "Entertainment: Books"
  },
  {
    "id": 11,
    "name": "Entertainment: Film"
  },
  {
    "id": 12,
    "name": "Entertainment: Music"
  },
  {
    "id": 13,
    "name": "Entertainment: Musicals & Theatres"
  },
  {
    "id": 14,
    "name": "Entertainment: Television"
  },
  {
    "id": 15,
    "name": "Entertainment: Video Games"
  },
  {
    "id": 16,
    "name": "Entertainment: Board Games"
  },
  {
    "id": 17,
    "name": "Science & Nature"
  },
  {
    "id": 18,
    "name": "Science: Computers"
  },
  {
    "id": 19,
    "name": "Science: Mathematics"
  },
  {
    "id": 20,
    "name": "Mythology"
  },
  {
    "id": 21,
    "name": "Sports"
  },
  {
    "id": 22,
    "name": "Geography"
  },
  {
    "id": 23,
    "name": "History"
  },
  {
    "id": 24,
    "name": "Politics"
  },
  {
    "id": 25,
    "name": "Art"
  },
  {
    "id": 26,
    "name": "Celebrities"
  },
  {
    "id": 27,
    "name": "Animals"
  },
  {
    "id": 28,
    "name": "Vehicles"
  },
  {
    "id": 29,
    "name": "Entertainment: Comics"
  },
  {
    "id": 30,
    "name": "Science: Gadgets"
  },
  {
    "id": 31,
    "name": "Entertainment: Japanese Anime & Manga"
  },
  {
    "id": 32,
    "name": "Entertainment: Cartoon & Animations"
  }
]

let categories = categoriesArr.map(({ id, name }) => [id, name]).sort((a, b) => a[0] - b[0])
categories = [["", "--Select Category--"], ...categories]
console.log(categories)

for (let [val, disp] of categories) {
  const option = document.createElement("option")
  option.setAttribute("value", val)
  option.innerText = disp
  selectCategory.appendChild(option)
}

// add to form
form.prepend(questionOptions)

// fetch and display trivia questions

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const amount = 10
  const queryAmount = `amount=${amount}`

  const difficulty = e.target.difficulty.value;
  const queryDifficulty = difficulty ? `&difficulty=${difficulty}` : ""

  const category = e.target.category.value
  const queryCategory = category ? `&category=${category}` : ""

  fetch(`https://opentdb.com/api.php?${queryAmount}${queryDifficulty}${queryCategory}`)
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
      <p>${question.difficulty}</p>
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