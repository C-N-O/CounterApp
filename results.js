"use strict";
const loader = document.getElementById('loader');
const numWords = document.getElementById('numWords');
const numParagraphs = document.getElementById('numParagraphs');
const btnReturn = document.getElementById('btnReturn');
const wordCounter = Number(localStorage.getItem('WordCount'));
const paragraphCounter = Number(localStorage.getItem('ParagraphCount'));
loader.style.display = 'block';
setTimeout(() => {
    //Retrieve from local storage
    loader.style.display = 'none';
    numWords.innerText =
        wordCounter === 1 ? `${wordCounter} Word` : `${wordCounter} Words`;
    numParagraphs.innerText =
        paragraphCounter === 1
            ? `${paragraphCounter} Paragraph`
            : `${paragraphCounter} Paragraphs`;
}, 3000);
//if return button is not null, return to home page nad clear the local storage
btnReturn === null || btnReturn === void 0 ? void 0 : btnReturn.addEventListener('click', () => {
    localStorage.clear();
    return window.location.assign('/');
});
