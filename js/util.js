const ALERT_SHOW_TIME = 10000;

//Функция, возвращающая случайное целое положительное число из заданного интервала
function getRandomInt(numberA, numberB) {
  const rangeStart = Math.ceil(Math.min(Math.abs(numberA), Math.abs(numberB)));
  const rangeEnd = Math.floor(Math.max(Math.abs(numberA), Math.abs(numberB)));
  return Math.floor(Math.random() * (rangeEnd - rangeStart + 1)) + rangeStart;
}

//Функция для проверки длины строки
function checkStringLength(currentString, maxLength) {
  currentString = String(currentString);
  return currentString.length <= maxLength;
}

//Функция для выбора случайного элемента из массива
function getRandomArrayElement(targetArray) {
  return targetArray[getRandomInt(0, targetArray.length-1)];
}

//Функция показа предупреждающего сообщения
function showAlert(message) {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '20px 10px';
  alertContainer.style.fontFamily = '"Open Sans", "Arial", sans-serif';
  alertContainer.style.fontSize = '32px';
  alertContainer.style.fontWeight = 'bold';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';
  alertContainer.style.opacity = '0.5';
  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
}

// Функция показа служебного сообщения
function showMessage(typeOfMessage) {
  const messageTemplate = document.querySelector(`#${typeOfMessage}`).content.querySelector(`.${typeOfMessage}`);
  const message = messageTemplate.cloneNode(true);
  message.style.zIndex = 100;
  document.body.append(message);
  message.querySelector(`.${typeOfMessage}__button`).addEventListener('click', () => {
    closeMessage(message);
  });
}

//Функция закрытия сообщения
function closeMessage(messageElement) {
  messageElement.remove();
}

function onOutsideClick(evt) {
  const targetContainer = document.querySelector('div.error__inner');
  if (!evt.target.composedPath().includes(targetContainer)) {

  }
}

export {getRandomInt, checkStringLength, getRandomArrayElement, showAlert, showMessage};
