(function(){
    function buildQuiz(){
      // variable to store the HTML output
      const output = [];
  
      // for each question...
      myQuestions.forEach(
        (currentQuestion, questionNumber) => {
  
          // variable to store the list of possible answers
          const answers = [];
  
          // and for each available answer...
          for(letter in currentQuestion.answers){
  
            // ...add an HTML radio button
            answers.push(
              `<label>
                <input type="radio" name="question${questionNumber}" value="${letter}">
                ${letter} :
                ${currentQuestion.answers[letter]}
              </label>`
            );
          }
  
          // add this question and its answers to the output
          output.push(
            `<div class="question"> ${currentQuestion.question} </div>
            <div class="answers"> ${answers.join('')} </div>`
          );
        }
      );
  
      // finally combine our output list into one string of HTML and put it on the page
      quizContainer.innerHTML = output.join('');
    }
  
    function showResults(){
  
      // gather answer containers from our quiz
      const answerContainers = quizContainer.querySelectorAll('.answers');
  
      // keep track of user's answers
      let numCorrect = 0;
  
      // for each question...
      myQuestions.forEach( (currentQuestion, questionNumber) => {
  
        // find selected answer
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;
  
        // if answer is correct
        if(userAnswer === currentQuestion.correctAnswer){
          // add to the number of correct answers
          numCorrect++;
  
          // color the answers green
          answerContainers[questionNumber].style.color = 'green';
        }
        // if answer is wrong or blank
        else{
          // color the answers red
          answerContainers[questionNumber].style.color = 'red';
        }
      });
  
      // show number of correct answers out of total
      resultsContainer.innerHTML = `You scored ${numCorrect} out of ${myQuestions.length}`;
    }
  
    const quizContainer = document.getElementById('quiz');
    const resultsContainer = document.getElementById('results');
    const submitButton = document.getElementById('submit');
    const myQuestions = [
      {
        question: "1.JavaScript File Has An Extension of:",
        answers: {
          a: ".java",
          b: ".js",
          c: ".javascript",
          d: ".xml"
        },
        correctAnswer: "b"
      },
      {
        question: "2.The Tag is used To Give Heading To The Table?",
        answers: {
          a: "head",
          b: "td",
          c: "th",
          d: "caption"
        },
        correctAnswer: "c"
      },
      {
        question: "3.IsNaN() Evaluates And Argument To Determine if Given Value:",
        answers: {
          a: "is not a number",
          b: "is not a new object",
          c: "is not a null",
          d: "none of the above"
        },
        correctAnswer: "a"
      },
      {
        question: "4.Inside which HTML element do we put the JavaScript?",
        answers: {
          a: "js",
          b: "javascript",
          c: "scripting",
          d: "script"
        },
        correctAnswer: "d"
      },
      {
        question: "5.Var numbers = [1, 2, 3] is an example of:",
        answers: {
          a: "array",
          b: "function",
          c: "object",
          d: "method"
        },
        correctAnswer: "a"
      },
    ];
  
    // Kick things off
    buildQuiz();
  
    // Event listeners
    submitButton.addEventListener('click', showResults);
  })();