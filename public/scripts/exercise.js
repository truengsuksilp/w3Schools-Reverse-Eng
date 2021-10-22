/* === Define variables === */
const correctAnswer1 = $('#correct-answer-1').html();
const correctAnswer2 = $('#correct-answer-2').html();

/* === Logic === */

// INITIATION SEQUENCE
const init = {
    runFunctions(event) {
        console.log("=== INITIATION ===")
        this.hide();
        this.greenCard();
        this.progressTicks();
    },

    hide() {
        $('#hide-answer-button').hide();
        $('.exercise-navbar').hide();
        $('footer').hide();
        $('.fa-caret-up').hide();
        $('.gsc-input-box').hide();
    },

    progressTicks() {
        const progressCount = parseInt($('#user-progress').html().trim());
        for ( i = 1; i <= progressCount; i++ ){
            $(`#q-order-${i} a`).html(`✓ Exercise ${i}`);
            $(`#q-order-${i} a`).css('padding-left', '12px');
        }
    },

    greenCard() {
        const currentQuestionNumber = $('#question-order').html().trim();
        const currentQuestion = $(`#q-order-${currentQuestionNumber}`);
        const currentQuestionText = $(`#q-order-${currentQuestionNumber} a`);
        const currentQuestionHover = $(`#q-order-${currentQuestionNumber}:hover`);

        currentQuestion.css('background-color', '#04AA6D');
        currentQuestionText.css('color', '#fff');
        currentQuestionText.css('font-weight', '700');
        currentQuestionText.css('background-color', '#04AA6D');  
    },
}

const checkAnswers = function (ans1, ans2) {

    const input1 = $('#input-1').val();
    const input2 = $('#input-2').val();
    const feedback = $('.feedback');

    // NOTE: Use localeCompare: Because input1 is in a different memory location
    if (input1 === ans1 === 0 && input2 === ans2) {
        feedback.html('Correct!')
        console.log(input1,input2);
    } else {
        feedback.html('Incorrect!')
    }
}

const showAnswers = function () {
    $('#input1').val(correctAnswer1);
    $('#input2').val(correctAnswer2);

    $('#show-answer-button').hide();
    $('#hide-answer-button').show();
}

const hideAnswers = function () {
    $('#input1').val('');
    $('#input2').val('');

    $('#show-answer-button').show();
    $('#hide-answer-button').hide();

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
        $(`.fa-caret-down.topic_${topic_number}`).css('display', 'none');
        $(`.fa-caret-up.topic_${topic_number}`).css('display', 'block');
    } else {
        $(`li.topic_${topic_number}`).css('display','block');
        $(`.fa-caret-down.topic_${topic_number}`).css('display', 'block');
        $(`.fa-caret-up.topic_${topic_number}`).css('display', 'none');
    }
}

/* === Event Listeners === */

$(window).on("load", init.runFunctions.bind(init));

// Accordion: Add eventListen to each topic tag independently
for( let i = 0; i < $(`.menu-label`).length; i++ ){
    $(`.menu-label`).click( (event) => hideQuestions(i));
}

$('#submit-button').click( (event) => checkAnswers(correctAnswer1, correctAnswer2) );
$('#show-answer-button').click( (event) => showAnswers());
$('#hide-answer-button').click( (event) => hideAnswers());
$('#collapse-lines').click( (event) => hideSideBar());
$('.fa-bars').click( (event) => showSideBar());

