const btnUpload = document.getElementById('btnUpload');
const btnShowResultPage = document.getElementById('btnShowResultPage')!;
const btnShowResultModal = document.getElementById('btnShowResultModal');
const btnPaste = document.getElementById('btnPaste');
const btnCloseModal = document.querySelector('.close-modal');

// the exclamation mark tells typescript that modal actual exists and not null
const modal = document.querySelector('.modal')!;
const toast = document.getElementById('snackbar')!;
const centerEl = document.querySelector('.center-main')!;

//type casting to HTMLInputElement
const textInput = document.querySelector('.textInput') as HTMLInputElement;

let fileHandle;
let file: File;
let content: string = '';
let modalContent: string = '';
let wordCount: number = 0;
let paragraphCount: number = 0;
const myWindow: any = window;

//Show file picker, read text and store it in content variable
const pickFile = async () => {
  [fileHandle] = await myWindow.showOpenFilePicker();
  file = await fileHandle.getFile();
  console.log(fileHandle);
  console.log(file);
  content = await file.text();
  showToastNotification();
};

//show success or error toast
const showToastNotification = () => {
  toast.className = 'show';

  if (content.length !== 0 && file.type === 'text/plain') {
    toast.innerText = 'File Read Successfully';
    toast.style.backgroundColor = 'rgb(128, 235, 52)';
    btnShowResultPage.style.backgroundColor = 'rgb(128, 235, 52)';
  } else {
    toast.innerText =
      'File is invalid. File must have content and must be a plain .txt file';
    toast.style.backgroundColor = 'rgb(235, 119, 52)';
  }

  setTimeout(() => {
    toast.className = toast.className.replace('show', '');
  }, 3000);
};

const startCounting = (text: string) => {
  //if we have a content, then there is atleast 1 paragrap
  paragraphCount++;

  //if we encounter a space or we reach the end of the text, increment wordCount
  //final push wordCount to local storage
  for (let i = 0; i <= text.length; i++) {
    if (text.charAt(i) === ' ' || i === text.length) wordCount++;

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
btnUpload?.addEventListener('click', () => {
  pickFile();
});

//if button is not null, check the contents
btnShowResultPage?.addEventListener('click', () => {
  //if we don't have a content, do nothing
  if (content.length === 0 || file.type !== 'text/plain') return;

  //if we have a content
  startCounting(content);
  sendToLocalStorage();

  //Redirect to the Results Page
  return window.location.assign('/results.html');
});

btnPaste?.addEventListener('click', () => {
  openModal();
});

btnShowResultModal?.addEventListener('click', () => {
  modalContent = textInput.value;

  if (modalContent.length === 0) return;

  startCounting(modalContent);
  sendToLocalStorage();
  closeModal();
  return window.location.assign('/results.html');
});

btnCloseModal?.addEventListener('click', () => {
  closeModal();
});
