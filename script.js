const form = document.querySelector('form');
const list = document.querySelector('ul');
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const bookList = [];

function Book(title, author){
  this.title = title;
  this.author = author;
}

function addToLocalStorage(newBook) {
  const key = title.value;
  localStorage.setItem(key, JSON.stringify(newBook));
}

form.addEventListener('submit', e => {
  e.preventDefault();

  showBook();

  title.value = "";
  author.value = "";
});

//! Add books
function showBook() {
  const li = document.createElement('li');

  li.innerHTML = `
  <span>${title.value}</span><br>
  <span>${author.value}</span>
  <button class="remove">Remove</button>
  <hr>
  `;

  let newBook = new Book(title.value, author.value);
  bookList.push(newBook);
  addToLocalStorage(newBook);
  list.appendChild(li);

  //! Remove books
  const removeBtn = document.querySelectorAll('.remove');

  removeBtn.forEach(btn => {
    btn.addEventListener('click', e => {
      removeBook(e.target.parentElement.firstElementChild.innerText);
      e.target.parentElement.remove();
    })
  })

  function removeBook(element) {
    const key = element;
    localStorage.removeItem(key);
    for(let i = 0; i < bookList.length; i++){
      if (element == bookList[i].title){
        bookList.splice(i,1);
      }
    }
  }
}