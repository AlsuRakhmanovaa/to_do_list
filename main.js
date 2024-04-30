let listElem = document.querySelector('.form__list');
let input = document.querySelector('.form__input');
let form = document.querySelector('.form');
let priority = document.querySelector('.form--priority');


let dateField = document.getElementById('dateField');

dateField.valueAsDate = new Date();


function clearTaskList() {
  listElem.innerHTML = ''; 
}

dateField.addEventListener('input', clearTaskList);


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

  listElem.appendChild(label); 
  input.value = '';
};


