//Функция возвращает случайное целое число из заданного диапазона включительно
function getRandomInt(min, max) {
  if (min < 0 || max < 0) {
    return 'Диапазон чисел должен быть положительным!';
  }

  if (min >= max) {
    return 'Нижняя граница диапазона должна быть меньше верхней!';
  }

  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
getRandomInt(2.4, 5.2);

//Функция для проверки максимальной длины строки
function checkStringLength (currentString, maxLength) {
  if (currentString.length <= maxLength) {
    return true;
  }

  return false;
}
checkStringLength ('Проверка!', 100);
