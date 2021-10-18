/* === Define variables === */
const $submit = $('#submitButton');
const $showAns = $('#showAnswerButton');

const correctAnswer1 = document.querySelector('#correctAnswer1').innerText;
const correctAnswer2 = document.querySelector('#correctAnswer2').innerText;

/* === Logic === */

const checkAnswers = function (ans1, ans2) {

    const input1 = document.querySelector('#input1').value;
    const input2 = document.querySelector('#input2').value;
    const feedback = document.querySelector('.feedback');

    // localeCompare:
    // Because input1 is in a different mem location
    if (input1.localeCompare(ans1) === 0 && input2.localeCompare(ans2) === 0) {
        feedback.innerText = 'Correct!'
    } else {
        feedback.innerText = 'Incorrect!'
        console.log([input1, ans1]);
        console.log([input1.length, ans1.length]);
    }
}

/* === Event Listeners === */

$('#checkAnswer').click( (event) => checkAnswers(correctAnswer1, correctAnswer2) )