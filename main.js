let listElem = document.querySelector('.todo__list');
let input = document.querySelector('.form__input');
let form = document.querySelector('.form');
let priority = document.querySelector('.form--priority');
let listByDate = new Map(); //объект для хранения списка задач по датам. хранение коллекции ключ-значение

//получаем сссылку на элемент из даты
let dateField = document.getElementById('dateField');
// устанавливаем текущую дату в поле ввода даты
dateField.valueAsDate = new Date();

//функция для очистки списка задач
function clearTaskList() {
  listElem.innerHTML = ''; //очищаем текущий список задач
  let selectedDate = dateField.valueAsDate.toISOString().split('T')[0]; //метод, который возвращает строковое представление даты и времени в формате ГГГГ-ММ--ДД T ч:м:с:мс
  //с помощью toISOString() преобразую текущую дату и время объекта Date в строку
  //split('T') разбивает эту строку на массив, используя символ Т как разделитесь, после разделения получается массив, где первый элемент содержит дату, а второй время
  //[0] извлекает из этого массива первый элемент, который содержит дату в формате ГГГГ-ММ-ДД
  //сделали мы так для того, чтобы использовать эту строку в качестве ключа при сохранении задач в map, чтобы различать задачи по датам

  //проверяем, есть ли задачи для выбранной даты
  if (listByDate.has(selectedDate)) {
    let tasks = listByDate.get(selectedDate); //получаем список задач для выбранной даты. get() используем для получения значения по ключу (дата) из Map.
    tasks.forEach(task => listElem.appendChild(task)); //добавляем задачи на страницу
  }
}
// Добавляем обработчик события изменения значения в поле ввода даты
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

  let selectedDate = dateField.valueAsDate.toISOString().split('T')[0]; //получаем список задач для выбранной даты

  let li = document.createElement('li');
  let span = document.createElement('span');
  let checkbox = document.createElement('input');
  let button = document.createElement('button');
  button.classList.add('delete-button');


  button.textContent = '✖'; 
  
  checkbox.type = 'checkbox';
  checkbox.classList.add('todo__checkbox'); 
  span.classList.add('todo__check-style');
  li.appendChild(checkbox); 
  li.appendChild(span);

  
  let div = document.createElement('div'); 
  div.textContent = input.value; 
  div.classList.add('todo__text');

  li.appendChild(div); 


  let label = document.createElement('label');
  label.appendChild(li);

  button.onclick = function() { 
    label.remove(); 
  };

  li.appendChild(button); 
  
  //добавляем задачу в список задач по соответствующей дате
  if (!listByDate.has(selectedDate)) {
    listByDate.set(selectedDate, [label]); //если для данной даты еще нет списка, то создаем новый. set используем для добавления нового элемента в коллекцию Map
  } else {
    let tasks = listByDate.get(selectedDate);
    tasks.push(label); //если список уже есть, то добавляем задачу в него. push для добавления нового элемент в конeц массива и изменяем его
    listByDate.set(selectedDate, tasks);
  }

  
  if (priority.classList.contains('important')) {
      li.classList.add('important');
  }

  listElem.appendChild(label); //добавляем задачу на страницу
  input.value = ''; //очищаем поле ввода задачи

  function removeFromListByDate(taskLabel, date) {
    if (listByDate.has(date)) { //проверяем, существует ли в listByDate список задач для указанной даты 
        let tasks = listByDate.get(date); //если список существует, то мы извлекаем его
        tasks = tasks.filter(task => task !== taskLabel); //с помощью фильтра создаем новый массив, исключив из него ту задачу, кот. хотим удалить
        listByDate.set(date, tasks); //обновляем список задач для даты
    }
  }

  button.onclick = function() { 
    label.remove(); 
    removeFromListByDate(label, selectedDate); //предотвращаем повторное появление удаленной задачи
  }
}