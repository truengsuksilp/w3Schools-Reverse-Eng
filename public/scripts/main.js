/* === Define variables === */
const correctAnswer1 = $('#correctAnswer1').html();
const correctAnswer2 = $('#correctAnswer2').html();

/* === Logic === */

const hide = function (){
    $('#hideAnswerButton').hide();
    $('.exercise-navbar').hide();
    $('footer').hide();
}

const checkAnswers = function (ans1, ans2) {

    const input1 = $('#input1').val();
    const input2 = $('#input2').val();
    const feedback = $('.feedback');

    // NOTE: Use localeCompare: Because input1 is in a different memory location
    if (input1.localeCompare(ans1) === 0 && input2.localeCompare(ans2) === 0) {
        feedback.innerText = 'Correct!'
    } else {
        feedback.innerText = 'Incorrect!'
    }
}

const showAnswers = function () {
    $('#input1').val(correctAnswer1);
    $('#input2').val(correctAnswer2);

    $('#showAnswerButton').hide();
    $('#hideAnswerButton').show();
}

const hideAnswers = function () {
    $('#input1').val('');
    $('#input2').val('');

    $('#showAnswerButton').show();
    $('#hideAnswerButton').hide();

}

const hideInput = function () {
    if ( $('#correctAnswer2').val() === null ) {
        $('#hideInput').hide($('userAnswer2'));
    }
}

const showSideBar = function () {
    $('.menu').show();
    $('.exercise-navbar').hide();
}

const hideSideBar = function () {
    $('.menu').hide();
    $('.exercise-navbar').show();
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

// Accordion: Add eventListen to each topic tag independently
for( let i = 0; i < $(`.menu-label`).length; i++ ){
    $(`p.topic_${i}`).click( (event) => hideQuestions(i));
}

$('#checkAnswer').click( (event) => checkAnswers(correctAnswer1, correctAnswer2) );
$('#submitButton').click( (event) => checkAnswers(correctAnswer1, correctAnswer2) );
$('#showAnswerButton').click( (event) => showAnswers());
$('#hideAnswerButton').click( (event) => hideAnswers());
$('.fa-times').click( (event) => hideSideBar());
$('.fa-bars').click( (event) => showSideBar());

