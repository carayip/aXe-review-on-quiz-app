'use strict';

const questionSet = [
  { 
    number: 1,
    text: 'What ingredients are in an old fashioned?',
    ans: [
      'bourbon, angostura bitter, sugar, orange twist',
	    'vodka, cranberry juice, salt',
	    'tequila, lime juice, sweet vermouth',
	    'gin, campari, sweet vermouth'],
  }, 

  {
    number: 2,
    text: 'What classic drink is topped off with a salt rim?',
    ans: [
      'Negroni', 
      'Margarita', 
      'Whiskey Sour', 
      'Manhattan'],
  }, 

  {
    number: 3,
    text: 'Which drink is served in a copper mug?',
    ans: [
      'Gimlet', 
      'Moscow Mule', 
      'Sazerac', 
      'Mimosa'],
  }, 
  {
    number: 4, 
    text: 'What are the ingredients in a whiskey sour?',
    	ans: [
        'lemon juice, sugar, gin',
	      'sweet vermouth, vodka',
	      'sugar, lemon juice, whiskey',
	      'ginger beer, lime juice, vodka'],
  }, 
  {
    number: 5,
    text: 'Which drink has only 2 ingredients?',
    ans: [
      'Margarita', 
      'Moscow Mule', 
      'Pimm\'s Cup', 
      'Mimosa'],
  }, 
  {
    number: 6,
    text: 'Which drink can you use either vodka or gin?',
    ans: [
      'Martini', 
      'Negroni', 
      'Daiquiri', 
      'Martinez'],
  }, 
  {
    number: 7,
    text: 'Which drink was inspired by a 75mm field gun during WW2?',
    ans: [
      'Daiquiri', 
      'Gimlet', 
      'French 75', 
      'Sazerac'],
  }, 
  {
    number: 8,
    text: 'What is the official drink of the Kentucky Derby?',
    ans: [
      'Manhattan', 
      'Mimosa', 
      'Pimm\'s Cup', 
      'Mint Julep'],
  }, 
  {
    number: 9,
    text: 'Which drink is mixed with brady, lemon juice and orange liqueur?',
    ans: [
      'Sidecar', 
      'Negroni', 
      'Margarita', 
      'Martinez'],
  }, 
  {
    number: 10,
    text: 'Which drink is a New Orleans classic?',
    ans: [
      'Sidecar', 
      'Gimlet', 
      'Mimosa', 
      'Sazerac'],
  }
];

const ANSWERS = [ 
  'bourbon, angostura bitter, sugar, orange twist', 
  'Margarita', 
  'Moscow Mule', 
  'sugar, lemon juice, whiskey', 
  'Mimosa', 
  'Martini', 
  'French 75', 
  'Mint Julep', 
  'Sidecar', 
  'Sazerac'
];

let questionNum = 1;

let correctAnswers = 0;

function questionTemplate(correctAnswers, question, questionsAnswered) {
  return `
    
    
    <form class="template" role="form">
      <fieldset>
      <legend id="question-page">
        <h2 id="question">${question.text}</h2>
      </legend>
        <label class="answerChoice">
          <input class="answer" type="radio" name="option" checked required></input>
          <span>${question.ans[0]}</span>
        </label>
  
        <label class="answerChoice">
          <input class="answer" type="radio" name="option" required></input>
          <span>${question.ans[1]}</span>
        </label>
  
        <label class="answerChoice">
          <input class="answer" type="radio" name="option" required></input>
          <span>${question.ans[2]}</span>
        </label>
  
        <label class="answerChoice">
          <input class="answer" type="radio" name="option" required></input>
          <span>${question.ans[3]}</span>
        </label>
      </fieldset>  
      <button type "submit" id="js-submit-button">Submit</button>

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

    const answer = $('input:checked').siblings('span');

    const userIsCorrect = checkUserAnswer(answer);
    if(userIsCorrect) {
      generateCorrectFeedback();
    } else {
      generateIncorrectFeedback();
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
  <section class="feedback-page" role="main">
    <h2>You are Correct!</h2>
    <button type="button" id="js-next-button">Next</button>
  </section>
`;

function generateIncorrectFeedback() {
  $('#container').html(incorrectFeedbackTemplate(questionNum));
}

function incorrectFeedbackTemplate(questionNum) {
  return `
    <section class="feedback-page" role="main">
      <h2>Wrong! It was ${ANSWERS[questionNum - 1]}!</h2>
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
    <section id="final-page" role="main">
      <h2>Final Score: ${correctAnswers} out of 10</h2>
      <button type="button" id="js-restart-button">Try Again?</button>
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