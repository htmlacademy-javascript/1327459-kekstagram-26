//Функция, возвращающая случайное целое положительное число из заданного интервала
const getRandomInt = function (numberA, numberB) {
  const rangeStart = Math.ceil(Math.min(Math.abs(numberA), Math.abs(numberB)));
  const rangeEnd = Math.floor(Math.max(Math.abs(numberA), Math.abs(numberB)));
  return Math.floor(Math.random() * (rangeEnd - rangeStart + 1)) + rangeStart;
};

//Функция для проверки длины строки
const checkStringLength = function (currentString, maxLength) {
  return currentString.length <= maxLength;
};

checkStringLength('Проверка!', 100);

//Функция для выбора случайного элемента из массива
const getRandomArrayElement = function (someArray) {
  return someArray[getRandomInt(0, someArray.length-1)];
};

//Генерируем массив из комментариев
const NAMES = [
  'Артем Малютин',
  'Арнольд Шварценеггер',
  'Сильвестр Сталоне',
  'Джонни Дэпп',
  'Том Круз',
  'Пендальф Синий',
  'Ленс Армстронг',
  'Сосо Павлиашвили',
  'Валерий Леонтьев',
  'Саша Барон Коэн'
];

const PHRASES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const MIN_COMMENTS_NUMBER = 1;
const MAX_COMMENTS_NUMBER = 5;

const getComments = function (number = getRandomInt(MIN_COMMENTS_NUMBER, MAX_COMMENTS_NUMBER)) {
  const commentsArray = [];
  for (let i = 0; i < number; i++) {
    commentsArray[i] = {
      id: '1',
      avatar: `img/avatar-${getRandomInt(1, 6)}.svg`,
      message: getRandomArrayElement(PHRASES),
      name: getRandomArrayElement(NAMES)
    };
  }
  return commentsArray;
};

//Генерируем массив из фотографий
const DESCRIPTIONS = [
  'Любимая фотография.',
  'Из воспоминаний.',
  'Фотография на память.',
  'Я был пьян, когда делал это фото.',
  'И все-таки, классное получилось фото.',
  'Ни у кого нет такой фотографии.',
  'Эту фотку я сделал на Iphone 13 Pro Max.',
  'Отправь это фото самому близкому тебе человеку.'
];

const PHOTOS_NUMBER = 25;

const MIN_LIKES_NUMBER = 15;
const MAX_LIKES_NUMBER = 200;

const getPhotoExpositions = function (number = PHOTOS_NUMBER) {
  const photoExpositionsArray = [];
  for (let i = 0; i < number; i++) {
    photoExpositionsArray[i] = {
      id: i + 1,
      url: `photos/${i + 1}.jpg`,
      description: getRandomArrayElement(DESCRIPTIONS),
      likes: getRandomInt(MIN_LIKES_NUMBER, MAX_LIKES_NUMBER),
      comments: getComments()
    };
  }
  return photoExpositionsArray;
};

getPhotoExpositions();
