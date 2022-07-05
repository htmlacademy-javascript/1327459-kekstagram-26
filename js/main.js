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

checkStringLength('Проверка!', 100);

//Функция для выбора случайного элемента из массива
const getRandomArrayElement = function (targetArray) {
  return targetArray[getRandomInt(0, targetArray.length-1)];
};

//Функция, которая генерирует массив из комментариев
const getComments = function (maxCommentsNumber = getRandomInt(1, 5)) {
  const commentsArray = [];
  for (let i = 0; i < maxCommentsNumber; i++) {
    commentsArray[i] = {
      id: null,
      avatar: `img/avatar-${getRandomInt(1, 6)}.svg`,
      message: getRandomArrayElement(PHRASES),
      name: getRandomArrayElement(NAMES)
    };
  }
  return commentsArray;
};

//Функция, которая генерирует массив из фотографий
const getPhotoExpositions = function (maxPhotosNumber = 25) {
  const photoExpositionsArray = [];//Массив для хранения объектов фотографий
  let idForCommentsCurrent = 1;//Переменная-счетчик, необходимая, чтобы id у комментариев не повторялся
  for (let i = 0; i < maxPhotosNumber; i++) {
    const commentsArrayResult = getComments();
    photoExpositionsArray[i] = {
      id: i + 1,
      url: `photos/${i + 1}.jpg`,
      description: getRandomArrayElement(DESCRIPTIONS),
      likes: getRandomInt(15, 200),
      comments: commentsArrayResult
    };
    for (let j = 0; j < commentsArrayResult.length; j++) {
      commentsArrayResult[j].id = idForCommentsCurrent;
      idForCommentsCurrent++;
    }
  }
  return photoExpositionsArray;
};

getPhotoExpositions();
