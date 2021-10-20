/* === Define variables === */
const correctAnswer1 = document.querySelector('#correctAnswer1').innerText;
const correctAnswer2 = document.querySelector('#correctAnswer2').innerText;

/* === Logic === */

const hide = function (){
    $('#hideAnswerButton').hide();
    $('.fa-bars').hide();
}

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
    $('#hideAnswerButton').show();
    // $('#hideAnswerButton').css('display', 'block');

}

const hideAnswers = function () {
    document.querySelector('#input1').value = "";
    document.querySelector('#input2').value = "";

    $('#showAnswerButton').show();
    $('#hideAnswerButton').hide();

}

const showSideBar = function () {
    $('.menu').show();
    $('.fa-bars').hide();
    console.log('showSideBar function');
}

const hideSideBar = function () {
    $('.menu').hide();
    $('.fa-bars').show();
}

const hideQuestions = function (topic_number) {

    if( $(`li.topic_${topic_number}`).css('display') === 'block' ) {
        $(`li.topic_${topic_number}`).css('display','none');
    } else {
        $(`li.topic_${topic_number}`).css('display','block');
    }
    
}

/* === Event Listeners === */

$(window).on("load", hide());

$('#checkAnswer').click( (event) => checkAnswers(correctAnswer1, correctAnswer2) );
$('#showAnswerButton').click( (event) => showAnswers());
$('#hideAnswerButton').click( (event) => hideAnswers());
$('.fa-times').click( (event) => hideSideBar());
$('.fa-bars').click( (event) => showSideBar());

// Accordion: Listen to each topic tag independently
for( let i = 0; i < $(`.menu-label`).length; i++ ){
    $(`p.topic_${i}`).click( (event) => hideQuestions(i));
}