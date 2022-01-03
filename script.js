const form = document.querySelector('form');
const list = document.querySelector('ul');
const title = document.querySelector('#title');
const author = document.querySelector('#author');

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

  list.appendChild(li);

  //! Remove books
  const removeBtn = document.querySelectorAll('.remove');

  removeBtn.forEach(btn => {
    btn.addEventListener('click', e => {
      e.target.parentElement.remove();
    })
  })
}