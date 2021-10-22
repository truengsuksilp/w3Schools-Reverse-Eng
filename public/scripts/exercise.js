/* === Define variables === */
const correctAnswer1 = $('#correctAnswer1').html();
const correctAnswer2 = $('#correctAnswer2').html();

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
        $('#hideAnswerButton').hide();
        $('.exercise-navbar').hide();
        $('footer').hide();
        $('.fa-caret-up').hide();
        $('.gsc-input-box').hide();
    },

    progressTicks() {
        const progressCount = parseInt($('#userProgress').html().trim());
        console.log(progressCount)
        for ( i = 1; i <= progressCount; i++ ){
            $(`#q-order-${i} a`).html(`✓ Exercise ${i}`);
            $(`#q-order-${i} a`).css('padding-left', '12px');
            console.log(`#q-order-${i} a`)
        }
    },

    greenCard() {
        const currentQuestionNumber = $('#questionOrder').html().trim();
        const currentQuestion = $(`#q-order-${currentQuestionNumber}`);
        const currentQuestionText = $(`#q-order-${currentQuestionNumber} a`);
        currentQuestion.css('background-color', '#04AA6D');
        currentQuestionText.css('color', '#fff');
        currentQuestionText.css('font-weight', '700');
        console.log([currentQuestionNumber, `#order-${currentQuestionNumber}`]);     
    },
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

$('#checkAnswer').click( (event) => checkAnswers(correctAnswer1, correctAnswer2) );
$('#submitButton').click( (event) => checkAnswers(correctAnswer1, correctAnswer2) );
$('#showAnswerButton').click( (event) => showAnswers());
$('#hideAnswerButton').click( (event) => hideAnswers());
$('#collapseLines').click( (event) => hideSideBar());
$('.fa-bars').click( (event) => showSideBar());

