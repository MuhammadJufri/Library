const addBook = document.querySelector(".addNewBook");
const overlay = document.querySelector(".overlay");
const modalBox = document.querySelector(".modal-box");
const submitNewBookData = document.querySelector(".submitNewBookData");
const titleInput = document.querySelector(".title");
const authorInput = document.querySelector(".author");
const pagesInput = document.querySelector(".pages");
const haveYouReadCheckBox = document.querySelector(".haveYouReadIt");
const booksList = document.querySelector("#books-list");
let myLibrary = [];
let haveYouReadIt = false;

addBook.addEventListener("click", function () {
  overlay.style.display = "block";
  modalBox.style.display = "flex";
  modalBox.style.flexDirection = "column";
  modalBox.style.alignItems = "center";
  modalBox.style.justifyContent = "center";
});

overlay.addEventListener("click", function () {
  overlay.style.display = "none";
  modalBox.style.display = "none";
});

submitNewBookData.addEventListener("submit", function (e) {
  e.preventDefault();
  if (haveYouReadCheckBox.checked === true) {
    haveYouReadIt = true;
  }
  addBookToLibrary(
    titleInput.value,
    authorInput.value,
    pagesInput.value,
    haveYouReadIt
  );
  modalBox.style.display = "none";
  overlay.style.display = "none";
  titleInput.value = "";
  authorInput.value = "";
  pagesInput.value = "";
  haveYouReadCheckBox.checked = false;
});

function Book(title, author, pages, read) {
  class Book {
    constructor(title, author, pages, read) {
      this.title = title;
      this.author = author;
      this.pages = pages;
      this.read = read;
    }
  }

  const book = new Book(title, author, pages, read);

  return book;
}

function addBookToLibrary(title, author, pages, read) {
  myLibrary.push(Book(title, author, pages, read));
  displayBooksToHtml();
  console.log(myLibrary);
}

function displayBooksToHtml() {
  let htmlCode = ``;
  myLibrary.forEach((book, index) => {
    htmlCode += `
    <li id="book${index}">
          <div class="book-info">
            <span>"${book.title}"</span>
            <span>${book.author}</span>
            <span>Page ${book.pages}</span>
          </div>
          <div class="book-buttons">
            <button style="${
              book.read === false
                ? "background-color: greenyellow"
                : "background-color:red"
            }">${book.read === false ? "Read" : "Unread"}</button>
            <button class="removeBook" id="${index}">Remove</button>
          </div>
        </li>
    `;
  });
  booksList.innerHTML = htmlCode;

  const removeBook = document.querySelector(".removeBook");
  removeBook.addEventListener("click", function () {
    const book = document.querySelector(`book${removeBook.id}`);
    booksList.removeChild(book);
  });
}
