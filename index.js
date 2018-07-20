'use strict';

const questionSet = [
  {
    number: 1,
    text: `Which is the largest moon in our solar system?`,
    ans1: `Callisto`,
    ans2: `Europa`,
    ans3: `Ganymede`,
    ans4: `Atlas`
  },

  {
    number: 2,
    text: `Which is the closest star outside our solar system?`,
    ans1: `Proxima Centauri`,
    ans2: `Ross 726-8`,
    ans3: `STeegarden's Star`,
    ans4: `Sirius`
  },

  {
    number: 3,
    text: `How long does light from the sun take to reach Earth?`,
    ans1: `One Day`,
    ans2: `One hour`,
    ans3: `Eight minutes`,
    ans4: `60 seconds`
  },
  {
    number: 4,
    text: `Which planet has the most moons?`,
    ans1: `Saturn`,
    ans2: `Mars`,
    ans3: `Uranus`,
    ans4: `Jupiter`
  },
  {
    number: 5,
    text: `How old, approximately, is the Earth?`,
    ans1: `6,000 yrs`,
    ans2: `1 million yrs`,
    ans3: `4.5 billion yrs`,
    ans4: `7.3 billion yrs`
  },
  {
    number: 6,
    text: `What was the first animal to orbit the Earth?`,
    ans1: `Dog`,
    ans2: `Monkey`,
    ans3: `Person`,
    ans4: `Cat`
  },
  {
    number: 7,
    text: `Who was the first person in space?`,
    ans1: `Neil Armstrong`,
    ans2: `Davy Crocket`,
    ans3: `Buzz Aldren`,
    ans4: `Yuri Gagarin`
  },
  {
    number: 8,
    text: `What does Sputnick translate to in english?`,
    ans1: `Vodka`,
    ans2: `Lost In Space`,
    ans3: `Fellow Traveler`,
    ans4: `Satellite`
  },
  {
    number: 9,
    text: `What sport was played on the moon?`,
    ans1: `Golf`,
    ans2: `Laser Tag`,
    ans3: `Football`,
    ans4: `Baseball`
  },
  {
    number: 10,
    text: `Which planet could float in water?`,
    ans1: `Saturn`,
    ans2: `Jupiter`,
    ans3: `Earth`,
    ans4: `Venus`
  }
];

const ANSWERS = [
  `Ganymede`,
  `Proxima Centauri`,
  `Eight minutes`,
  `Jupiter`,
  `4.5 billion yrs`,
  `Dog`,
  `Yuri Gagarin`,
  `Fellow Traveler`,
  `Golf`,
  `Saturn`
];

let questionNum = 1;

let correctAnswers = 0;

function questionTemplate(correctAnswers, question, questionsAnswered) {
  return `
    <main role="main" section id="question-page" >
    <h2 id="question">${question.text}</h2>

    <form>
      <legend>${question.text}</legend>
      <fieldset>
        <label>
          <input class="answer" type="radio" name="option" />
          <span>${question.ans1}</span>
        </label>

        <label>
          <input class="answer" type="radio" name="option"  />
          <span>${question.ans2}</span>
        </label>

        <label>
          <input class="answer" type="radio" name="option"  />
          <span>${question.ans3}</span>
        </label>

        <label>
          <input class="answer" type="radio" name="option"  />
          <span>${question.ans4}</span>
        </label>
      </fieldset>
      <button id="js-submit-button">Submit</button>

    </form>

    <div id="status-bar">
      <span id="question-count">Question: ${question.number}/10</span>
      <span id="score-count">Score: ${correctAnswers}/${questionsAnswered}</span>
    </div>
  </section>
  `;
}

function handleStartButton() {
  $('#js-start-button').click(function(event) {
    nextQuestion();
  });
}

function handleSubmitButton() {
  $('#container').on('click', '#js-submit-button', function(event) {
    event.preventDefault()
    if ($("input[type=radio]:checked").length > 0) {
    
      const answer = $('input:checked').siblings('span');

      const userIsCorrect = checkUserAnswer(answer);
      if(userIsCorrect) {
      generateCorrectFeedback();
    } else {
      generateIncorrectFeedback();
    }
    } else{
        alert("Please choose an option!");
    } 
  });
}

function handleNextButton() {
  $('#container').on('click', '#js-next-button', function(event) {

    if(questionNum === 10) {
      createResultsPage(correctAnswers);
    } else {
      iterateQuestion();
      nextQuestion();
  }
  });
}

function handleRestartButton() {
  $('#container').on('click', '#js-restart-button', function(event) {

    questionNum = 1;

    correctAnswers = 0;

    nextQuestion();
  });
}

function nextQuestion() {

  const question = questionSet[questionNum - 1];

  const questionsAnswered = questionNum - 1;

  $('#container').html(questionTemplate(correctAnswers, question, questionsAnswered));
}

function checkUserAnswer(answer) {
  if(answer.text() === ANSWERS[questionNum - 1]) {
    return true;
  } else {
    return false;
  }
}

function generateCorrectFeedback() {
  $('#container').html(correctFeedback);
  iterateCorrectAnswers();
}

const correctFeedback = `
  <section class="feedback-page" >
    <h2>Correct!</h2>

    <button id="js-next-button">Next</button>
  </section>
`;

function generateIncorrectFeedback() {
  $('#container').html(incorrectFeedbackTemplate(questionNum));
}

function incorrectFeedbackTemplate(questionNum) {
  return `
    <section class="feedback-page">
      <h2> So close! The answer is ${ANSWERS[questionNum - 1]}</h2>

      <button id="js-next-button">Next</button>
    </section>
`;
}

function iterateQuestion() {
  questionNum++;
}

function iterateCorrectAnswers() {
  correctAnswers++;
}

function createResultsPage(correctAnswers) {
  $('#container').html(`
    <section id="final-page">
      <h2>Final Score: ${correctAnswers} out of 10</h2>
      <button id="js-restart-button">Would you like to relaunch?</button>
    </section>
  `);
}

function handleButtons() {
  handleStartButton();
  handleSubmitButton();
  handleNextButton();
  handleRestartButton();
}

handleButtons();
