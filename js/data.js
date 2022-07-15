import {getRandomInt, getRandomArrayElement} from './util.js';

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

//Функция, которая генерирует массив из комментариев
function getComments(maxCommentsNumber = getRandomInt(1, 5)) {
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
}

//Функция, которая генерирует массив из фотографий
function getPhotoExpositions(maxPhotosNumber = 25) {
  const photoExpositionsArray = [];
  let idForCommentCurrent = 1;
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
      commentsArrayResult[j].id = idForCommentCurrent;
      idForCommentCurrent++;
    }
  }
  return photoExpositionsArray;
}

//Генерируем базу данных из фотографий
const GENERATED_PHOTOS_DATA = getPhotoExpositions();

//Передаем сгенерированные данные для использования в других модулях
export {GENERATED_PHOTOS_DATA};
