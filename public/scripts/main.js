/* === Logic === */

// INITIATION SEQUENCE
const init = {
    runFunctions(event) {
        console.log("=== INITIATION ===")
        // this.hide();
        this.searchBox();
    },

    hide() {
        $('.gsc-input-box').hide();
    },
    searchBox() {
        $('.gsc-search-button-v2').css('border-radius', '8px');
        $('.gsc-search-button-v2').css('background-color', '#04AA6D');
        $('.gsc-search-button-v2').css('border', '0px solid white');
    },
}

const showHideInput = function () {
    if ( $('.gsc-input-box').css('display') === 'none' ) {
        $('.gsc-input-box').show()
    } else {
        $('.gsc-input-box').hide()
    }
}


/* === Event Listeners === */

$(window).on("load", init.runFunctions.bind(init));
$('.gsc-search-button-v2').click(showHide.runFunctions.bind(init));





// const showHide = {
//     runFunctions(event) {
//         console.log("=== Initation 2.0 ===");
//         this.showHideInput();
//     },

//     showHideInput() {
//         if ( $('.gsc-input-box').css('display') === 'none' ) {
//             $('.gsc-input-box').show()
//         } else {
//             $('.gsc-input-box').hide()
//         }
//     },
// }
// $('.gsc-search-button-v2').click( (event) => showHideInput());