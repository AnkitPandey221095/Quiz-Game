// initializing each variable for dom menipulation

  const questionElement = document.getElementById("Question");
  const options = document.querySelectorAll(".option");
  const nextButton = document.getElementById("next-btn");

  let questions = [];
  let currentQuestionIndex = 0;
  let score = 0;

// Fetching api for differnt opraions

  function fetchQuestions() {
    nextButton.classList.add("hide");
      fetch("https://opentdb.com/api.php?amount=5&category=21&difficulty=easy&type=multiple")
          .then(response => response.json())
          .then(data => {
              questions = data.results;
              showQuestion();
          })
          .catch(error => console.error("Error fetching questions:", error));
  }

  //showing question using api

  function showQuestion() {
      if (currentQuestionIndex >= questions.length) {
          return showResult();
      }
      const questionData = questions[currentQuestionIndex];
      questionElement.innerHTML = questionData.question;
      const answers = [...questionData.incorrect_answers, questionData.correct_answer];
      answers.sort(() => Math.random() - 0.5);
      
      options.forEach((option, index) => {
          option.innerHTML = answers[index];
          option.classList.remove("correct", "wrong");
          option.addEventListener("click", () => selectAnswer(answers[index], questionData.correct_answer));
      });
   
  }

// seecting ontion and increasing score when option is correct


  function selectAnswer(selected, correct) {
    options.forEach(option => {
        if (option.innerHTML === correct) {
            option.classList.add("correct");
        } else if (option.innerHTML === selected) {
            option.classList.add("wrong");
        }
        option.removeEventListener("click", selectAnswer);
    });

    if (selected === correct) {
        score++;
    }
    nextButton.classList.remove("hide");
}



  function showResult() {
      questionElement.innerHTML=`Your Total score is ${score} out of 5`
      document.querySelector(".Options").classList.add('hide')
      nextButton.classList.add("hide");
      document.querySelector('.start').classList.remove('hide')
  }

  document.querySelector('.start').addEventListener('click',()=>{
    document.querySelector('.start').classList.add('hide')
  })

  nextButton.addEventListener("click", () => {
      currentQuestionIndex++;
      showQuestion();
      nextButton.classList.add('hide')
  });

  fetchQuestions();
