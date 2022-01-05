const list = document.querySelector('ul');
const form = document.querySelector('form');
const title = document.querySelector('#title');
const author = document.querySelector('#author');
class Books {
  constructor() {
    this.bookList = [];
  }

  addNewBook(newBook) {
    return this.bookList.push(newBook);
  }

  removeBooksFromList(element) {
    for (let i = 0; i < this.bookList.length; i += 1) {
      if (element === this.bookList[i].title) {
        this.bookList.splice(i, 1);
      }
    }
    return this.bookList;
  }
}

const books = new Books();

function addToLocalStorage(books) {
  localStorage.setItem('books', JSON.stringify(books));
}

function appendBooksToList() {
  list.innerHTML = '';
  books.bookList.forEach((book, index) => {
    const li = document.createElement('li');

    if (index % 2 === 1) {
      li.classList = 'bg-white';
    }

    li.innerHTML = `
    <p>"<span>${book.title}</span>" </p>
    <p>by ${book.author}</p>
    <button class="remove">Remove</button>
    `;
    list.appendChild(li);
  });
}

function updateDomAndLocalStorage() {
  appendBooksToList();
  localStorage.clear();
  addToLocalStorage(books);
}

function removeBook() {
  const removeButtons = document.getElementsByClassName('remove');
  for (let i = 0; i < removeButtons.length; i += 1) {
    const button = removeButtons[i];
    button.addEventListener('click', (event) => {
      const element = event.target.parentElement.firstElementChild.firstElementChild.innerText;
      books.removeBooksFromList(element);
      updateDomAndLocalStorage();
      removeBook();
    });
  }
}

/* eslint max-classes-per-file: ["error", 2] */

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

function getFromLocalStorage() {
  if (localStorage.length !== 0) {
    const booksFromLocStg = JSON.parse(localStorage.getItem('books'));
    booksFromLocStg.bookList.forEach((book) => {
      books.bookList.push(book);
    });
    updateDomAndLocalStorage();
    removeBook();
  }
}

getFromLocalStorage();

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const newBook = new Book(title.value, author.value);
  title.value = '';
  author.value = '';
  books.addNewBook(newBook);
  updateDomAndLocalStorage();
  removeBook();
});

const nav = document.querySelector('nav');
const listTab = document.querySelector('.list-tab');
const formTab = document.querySelector('.form-tab');
const contactTab = document.querySelector('.constact-tab');
const listSection = document.getElementById('list-section');
const formSection = document.getElementById('form-section');
const contactSection = document.getElementById('contact-section');

nav.addEventListener('click', (event) => {
  if (event.target.innerText === 'List'){
    listSection.style.display = "block";
    formSection.style.display = "none";
    contactSection.style.display = "none";
    listTab.style.color = 'red';
    formTab.style.color = 'black';
    contactTab.style.color = 'black';
  } else if (event.target.innerText === 'Add new'){
    listSection.style.display = "none";
    formSection.style.display = "block";
    contactSection.style.display = "none";
    listTab.style.color = 'black';
    formTab.style.color = 'red';
    contactTab.style.color = 'black';
  } else if (event.target.innerText === 'Contact'){
    listSection.style.display = "none";
    formSection.style.display = 'none';
    contactSection.style.display = 'block';
    listTab.style.color = 'black';
    formTab.style.color = 'black';
    contactTab.style.color = 'red';
  }
});

