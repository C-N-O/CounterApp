"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const btnUpload = document.getElementById('btnUpload');
const btnShowResultPage = document.getElementById('btnShowResultPage');
const btnShowResultModal = document.getElementById('btnShowResultModal');
const btnPaste = document.getElementById('btnPaste');
const btnCloseModal = document.querySelector('.close-modal');
// the exclamation mark tells typescript that modal actual exists and not null
const modal = document.querySelector('.modal');
const toast = document.getElementById('snackbar');
const centerEl = document.querySelector('.center-main');
//type casting to HTMLInputElement
const textInput = document.querySelector('.textInput');
let fileHandle;
let file;
let content = '';
let modalContent = '';
let wordCount = 0;
let paragraphCount = 0;
const myWindow = window;
//Show file picker, read text and store it in content variable
const pickFile = () => __awaiter(void 0, void 0, void 0, function* () {
    [fileHandle] = yield myWindow.showOpenFilePicker();
    file = yield fileHandle.getFile();
    console.log(fileHandle);
    console.log(file);
    content = yield file.text();
    showToastNotification();
});
//show success or error toast
const showToastNotification = () => {
    toast.className = 'show';
    if (content.length !== 0 && file.type === 'text/plain') {
        toast.innerText = 'File Read Successfully';
        toast.style.backgroundColor = 'rgb(128, 235, 52)';
        btnShowResultPage.style.backgroundColor = 'rgb(128, 235, 52)';
    }
    else {
        toast.innerText =
            'File is invalid. File must have content and must be a plain .txt file';
        toast.style.backgroundColor = 'rgb(235, 119, 52)';
    }
    setTimeout(() => {
        toast.className = toast.className.replace('show', '');
    }, 3000);
};
const startCounting = (text) => {
    //if we have a content, then there is atleast 1 paragrap
    paragraphCount++;
    //if we encounter a space or we reach the end of the text, increment wordCount
    //final push wordCount to local storage
    for (let i = 0; i <= text.length; i++) {
        if (text.charAt(i) === ' ' || i === text.length)
            wordCount++;
        //If the character is a new line and the next character is not, then increment paragraph count
        if (text.charAt(i) === '\n' && text.charAt(i + 1) !== '\n')
            paragraphCount++;
    }
};
const sendToLocalStorage = () => {
    localStorage.setItem('WordCount', wordCount.toString());
    localStorage.setItem('ParagraphCount', paragraphCount.toString());
};
const openModal = () => {
    modal.classList.remove('hidden');
    textInput.focus();
};
function closeModal() {
    modal.classList.add('hidden');
    centerEl.classList.remove('hidden');
}
//if upload button is not null
btnUpload === null || btnUpload === void 0 ? void 0 : btnUpload.addEventListener('click', () => {
    pickFile();
});
//if button is not null, check the contents
btnShowResultPage === null || btnShowResultPage === void 0 ? void 0 : btnShowResultPage.addEventListener('click', () => {
    //if we don't have a content, do nothing
    if (content.length === 0 || file.type !== 'text/plain')
        return;
    //if we have a content
    startCounting(content);
    sendToLocalStorage();
    //Redirect to the Results Page
    return window.location.assign('/results.html');
});
btnPaste === null || btnPaste === void 0 ? void 0 : btnPaste.addEventListener('click', () => {
    openModal();
});
btnShowResultModal === null || btnShowResultModal === void 0 ? void 0 : btnShowResultModal.addEventListener('click', () => {
    modalContent = textInput.value;
    if (modalContent.length === 0)
        return;
    startCounting(modalContent);
    sendToLocalStorage();
    closeModal();
    return window.location.assign('/results.html');
});
btnCloseModal === null || btnCloseModal === void 0 ? void 0 : btnCloseModal.addEventListener('click', () => {
    closeModal();
});
