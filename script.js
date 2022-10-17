const addBook = document.querySelector(".addNewBook");
const overlay = document.querySelector(".overlay");
const modalBox = document.querySelector(".modal-box");
const submitNewBookData = document.querySelector(".submitNewBookData");
const titleInput = document.querySelector(".title");
const authorInput = document.querySelector(".author");
const pagesInput = document.querySelector(".pages")
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
  modalBox.style.display = "none"
});

submitNewBookData.addEventListener("submit", function (e) {
  e.preventDefault();
  addBookToLibrary(titleInput.value, authorInput.value, pagesInput.value);
  modalBox.style.display = "none";
  overlay.style.display = "none";
  titleInput.value = "";
  authorInput.value = "";
  pagesInput.value = "";
});

function Book(title, author, pages) {
  class Book {
    constructor(title, author, pages) {
      this.title = title;
      this.author = author;
      this.pages = pages;
    }
  }

  const book = new Book(title, author, pages);

  return book;
}

function addBookToLibrary(title, author, pages) {
  myLibrary.push(
    Book(
      title,
      author,
      pages
    )
  )
  console.log(myLibrary)
}