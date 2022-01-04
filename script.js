window.onload = () => {
  const form = document.querySelector('form');
  const list = document.querySelector('ul');
  const title = document.querySelector('#title');
  const author = document.querySelector('#author');
  const bookList = [];

  function Book(title, author) {
    this.title = title;
    this.author = author;
  }

  function addToLocalStorage() {
    localStorage.setItem('books', JSON.stringify(bookList));
  }

  //! Add books
  function showBook() {
    const li = document.createElement('li');

    li.innerHTML = `
    <span>${title.value}</span><br>
    <span>${author.value}</span>
    <button class="remove">Remove</button>
    <hr>
    `;

    const newBook = new Book(title.value, author.value);
    bookList.push(newBook);
    addToLocalStorage(bookList);
    list.appendChild(li);

    //! Remove books
    const removeBtn = document.querySelectorAll('.remove');

    function removeBook(element) {
      const key = element;
      localStorage.removeItem(key);
      for (let i = 0; i < bookList.length; i+= 1) {
        if (element === bookList[i].title) {
          bookList.splice(i, 1);
        }
      }
    }

    removeBtn.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        removeBook(e.target.parentElement.firstElementChild.innerText);
        e.target.parentElement.remove();
        localStorage.clear();
        addToLocalStorage(bookList);
      });
    });
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    localStorage.clear();
    addToLocalStorage(bookList);
    showBook();

    title.value = '';
    author.value = '';
  });

  //! LocalStorage when loaded
  function getBook() {
    const dataFromLocalStorage = JSON.parse(localStorage.getItem('books'));
    const list = document.querySelector('ul');

    if (localStorage) {
      dataFromLocalStorage.forEach((book) => {
        bookList.push(book);

        const li = document.createElement('li');

        li.innerHTML = `
        <span>${book.title}</span><br>
        <span>${book.author}</span>
        <button class="remove">Remove</button>
        <hr>
        `;
        list.appendChild(li);
      })
    }
  }

  getBook();

  const removeBtn = document.querySelectorAll('.remove');

  removeBtn.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      function removeBook(element) {
        const key = element;
        localStorage.removeItem(key);
        for (let i = 0; i < bookList.length; i+= 1) {
          if (element === bookList[i].title) {
            bookList.splice(i, 1);
          }
        }
      }

      removeBook(e.target.parentElement.firstElementChild.innerText);
      e.target.parentElement.remove();
      localStorage.clear();
      addToLocalStorage(bookList);
    });
  });
};
