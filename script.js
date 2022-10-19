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
let bookId = 0;

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
    bookId,
    titleInput.value,
    authorInput.value,
    pagesInput.value,
    haveYouReadIt
  );
  bookId++;
  modalBox.style.display = "none";
  overlay.style.display = "none";
  titleInput.value = "";
  authorInput.value = "";
  pagesInput.value = "";
  haveYouReadCheckBox.checked = false;
  haveYouReadIt = false;
});

function Book(id, title, author, pages, read) {
  class Book {
    constructor(id, title, author, pages, read) {
      this.id = id;
      this.title = title;
      this.author = author;
      this.pages = pages;
      this.read = read;
    }
  }

  const book = new Book(id, title, author, pages, read);

  return book;
}

function addBookToLibrary(bookId, title, author, pages, read) {
  myLibrary.push(Book(bookId, title, author, pages, read));
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
            <button id="read${index}" onClick="readBook(${index})" style="${
      book.read === false
        ? "background-color: greenyellow"
        : "background-color:red"
    }">${book.read === false ? "Read" : "Unread"}</button>
            <button class="removeBook" id="${index}" onClick="removeBook(${index})">Remove</button>
          </div>
        </li>
    `;
  });
  booksList.innerHTML = htmlCode;
}

function findBookObjectUsingId(id) {
  let bookObject;
  myLibrary.forEach((book) => {
    if (book.id === id) {
      bookObject = book;
    }
  });
  return bookObject;
}

function removeBook(id) {
  const book = document.querySelector(`#book${id}`);
  myLibrary.splice(id, 1);
  booksList.removeChild(book);
  console.log(myLibrary);
}

function readBook(idBook) {
  if (findBookObjectUsingId(idBook).read === true) return unreadBook(idBook);

  const readButton = document.querySelector(`#read${idBook}`);
  findBookObjectUsingId(idBook).read = true;
  readButton.style.backgroundColor = "red";
  readButton.innerHTML = "Unread";
}

function unreadBook(idBook) {
  const unreadButton = document.querySelector(`#read${idBook}`);
  findBookObjectUsingId(idBook).read = false;
  unreadButton.style.backgroundColor = "greenyellow";
  unreadButton.innerHTML = "Read";
  unreadButton.id = `read${idBook}`;
}
