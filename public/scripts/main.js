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

const showAnswers = function () {
    document.querySelector('#input1').value = correctAnswer1;
    document.querySelector('#input2').value = correctAnswer2;

    $('#showAnswerButton').hide();
    $('#hideAnswerButton').css('display', 'block');

}

const hideAnswers = function () {
    document.querySelector('#input1').value = "";
    document.querySelector('#input2').value = "";

    $('#showAnswerButton').show();
    $('#hideAnswerButton').css('display', 'none');

}

/* === Event Listeners === */

// $(window).on("load", hide());

$('#checkAnswer').click( (event) => checkAnswers(correctAnswer1, correctAnswer2) );
$('#showAnswerButton').click( (event) => showAnswers());
$('#hideAnswerButton').click( (event) => hideAnswers());

