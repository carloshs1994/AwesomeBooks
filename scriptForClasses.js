const list = document.querySelector('ul');
const form = document.querySelector('form');
const title = document.querySelector('#title');
const author = document.querySelector('#author');
class Books {
  constructor(){
    this.bookList = [];
  }
  addNewBook(newBook) {
    return this.bookList.push(newBook);
  }
  removeBooksFromList() {
    const removeButtons = document.getElementsByClassName('remove');
  for(let i = 0; i < removeButtons.length; i += 1){
    let button = removeButtons[i];
    button.addEventListener('click', function(event) {
      let element = event.target.parentElement.firstElementChild.firstElementChild.innerText;
      for (let i = 0; i < books.bookList.length; i++) {
        if (element === books.bookList[i].title) {
          books.bookList.splice(i, 1);
        }
      }
      updateDomAndLocalStorage();
    });
  }
  }
}
const books = new Books();

class Book{
  constructor (title, author) {
  this.title = title;
  this.author = author;
  }
}

getFromLocalStorage();

form.addEventListener('submit', function(event) {
  event.preventDefault();
  const newBook = new Book(title.value, author.value);
  title.value = '';
  author.value = '';
  books.addNewBook(newBook);
  updateDomAndLocalStorage();
});

function appendBooksToList() {
  list.innerHTML = '';
  books.bookList.forEach((book, index) => {
    const li = document.createElement('li');

    if (index % 2 == 1) {
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

function updateDomAndLocalStorage () {
  appendBooksToList();
  localStorage.clear();
  addToLocalStorage(books);
  books.removeBooksFromList();
}

function addToLocalStorage(books) {
  localStorage.setItem('books', JSON.stringify(books));
}

function getFromLocalStorage() {
  if(localStorage.length!=0){
    const booksFromLocStg = JSON.parse(localStorage.getItem('books'));
    booksFromLocStg.bookList.forEach(book => {
      books.bookList.push(book);
    })
    updateDomAndLocalStorage();
  }
}
