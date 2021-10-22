/* === Variables === */

CodeMirror(document.querySelector('#my-js'), {
    lineNumbers: true,
    tabSize: 1,
    value: 'console.log("Hello, World");',
    mode: 'javascript'
  });

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


/* === Event Listeners === */
$(window).on("load", init.runFunctions.bind(init));
