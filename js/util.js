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

//Функция показа служебного сообщения
function showAlert(message) {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.textTransform = 'none';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
}

export {getRandomInt, checkStringLength, getRandomArrayElement, showAlert};
