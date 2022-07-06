//Функция, возвращающая случайное целое положительное число из заданного интервала
const getRandomInt = function (numberA, numberB) {
  const rangeStart = Math.ceil(Math.min(Math.abs(numberA), Math.abs(numberB)));
  const rangeEnd = Math.floor(Math.max(Math.abs(numberA), Math.abs(numberB)));
  return Math.floor(Math.random() * (rangeEnd - rangeStart + 1)) + rangeStart;
};

//Функция для проверки длины строки
const checkStringLength = function (currentString, maxLength) {
  currentString = String(currentString);
  return currentString.length <= maxLength;
};

//Функция для выбора случайного элемента из массива
const getRandomArrayElement = function (targetArray) {
  return targetArray[getRandomInt(0, targetArray.length-1)];
};

export {getRandomInt, checkStringLength, getRandomArrayElement};
