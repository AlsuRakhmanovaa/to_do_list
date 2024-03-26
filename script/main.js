let list = document.querySelector('.todo-list');
let input = document.querySelector('.todo-input');
let form = document.querySelector('.todo-form');
let priority = document.querySelector('.todo-priority');

priority.onclick = function () {
  priority.classList.toggle('important');
  if (priority.classList.contains('important')) {
    priority.textContent = 'Важная задача';
  } else {
    priority.textContent = 'Обычная задача';
  }
};

form.onsubmit = function (evt) {
  evt.preventDefault();

  let li = document.createElement('li');
  let span = document.createElement('span');
  let checkbox = document.createElement('input');
  
  checkbox.type = 'checkbox';
  checkbox.classList.add('check-box'); 
  span.classList.add('check-style')
  li.appendChild(checkbox); 
  li.appendChild(span);
  
  let textNode = document.createTextNode(input.value);
  li.appendChild(textNode); 
  
  let label = document.createElement('label')
  label.appendChild(li)
  
  if (priority.classList.contains('important')) {
      li.classList.add('important');
  }

  list.appendChild(label); 
  input.value = '';
};