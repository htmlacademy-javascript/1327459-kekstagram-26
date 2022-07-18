import {GENERATED_PHOTOS_DATA} from './data.js';

const MAX_NUMBER_OF_COMMENTS_TO_SHOW = 5;

//Массив для хранения комментариев текущей фотографии
let currentPhotoComments = [];

const bigPictureWindow = document.querySelector('.big-picture');
const bigPictureWindowCloseButton = bigPictureWindow.querySelector('#picture-cancel');
const commentsList = bigPictureWindow.querySelector('.social__comments');
const commentsCount = bigPictureWindow.querySelector('.social__comment-count');
const showMoreCommentsButton = bigPictureWindow.querySelector('.social__comments-loader');

//Функция рендера комментиариев
function renderComments(comments) {
  const commentsFragment = document.createDocumentFragment();
  comments.forEach((comment) => {
    const commentsItem = document.createElement('li');
    commentsItem.classList.add('social__comment');

    const socialImage = document.createElement('img');
    socialImage.classList.add('social__picture');
    socialImage.src = comment.avatar;
    socialImage.alt = comment.name;
    socialImage.width = 35;
    socialImage.height = 35;
    commentsItem.append(socialImage);

    const socialText = document.createElement('p');
    socialText.classList.add('social__text');
    socialText.textContent = comment.message;
    commentsItem.append(socialText);

    commentsFragment.append(commentsItem);
  });

  return commentsFragment;
}

//Функция загрузки первых комментариев
function showFirstComments(comments) {
  const shownComments = comments.slice(0, MAX_NUMBER_OF_COMMENTS_TO_SHOW);
  commentsCount.firstChild.textContent = `${shownComments.length} из  `;
  commentsList.append(renderComments(shownComments));

  if (shownComments.length === comments.length) {
    showMoreCommentsButton.classList.add('hidden');
  } else {
    showMoreCommentsButton.classList.remove('hidden');
  }
}

//Функция показа дополнительных комментиариев
function showMoreComments() {
  const addComments = currentPhotoComments.slice(commentsList.children.length, commentsList.children.length + MAX_NUMBER_OF_COMMENTS_TO_SHOW);
  commentsList.append(renderComments(addComments));

  if (currentPhotoComments.length === commentsList.children.length) {
    showMoreCommentsButton.classList.add('hidden');
  }

  commentsCount.firstChild.textContent = `${commentsList.children.length} из  `;
}

//Функция заполнения данными окна с большой фотографией
function createBigPictureWindow(photosDataArray, elementDataIndex) {
  //Находим нужный элемент массива из фотографий по совпадающему id
  const photo = photosDataArray.find((photoElement) => photoElement.id === elementDataIndex);

  //Заполняем модальное окно данными
  bigPictureWindow.querySelector('.big-picture__img img').src = photo.url;
  bigPictureWindow.querySelector('.big-picture__img img').alt = 'Случайная фотография';
  bigPictureWindow.querySelector('.likes-count').textContent = photo.likes;
  bigPictureWindow.querySelector('.social__caption').textContent = photo.description;
  bigPictureWindow.querySelector('.comments-count').textContent = photo.comments.length;

  commentsList.innerHTML = '';
  currentPhotoComments = photo.comments;

  showFirstComments(currentPhotoComments);
}

//Функция открытия окна с большой фотографией
function openBigPictureWindow(evt) {
  const eventTarget = evt.target.closest('a');
  if (eventTarget) {
    const photoIndex = Number(eventTarget.dataset.index);

    //Собираем модальное окно на основе исходных данных
    createBigPictureWindow(GENERATED_PHOTOS_DATA, photoIndex);

    //Показываем модальное окно пользователю
    bigPictureWindow.classList.remove('hidden');
    document.body.classList.add('modal-open');

    //Добавляем обработчики событий на модальное окно
    document.addEventListener('keydown', onBigPictureWindowEscKeydown);
    bigPictureWindowCloseButton.addEventListener('click', closeBigPictureWindow);
    showMoreCommentsButton.addEventListener('click', showMoreComments);
  }
}

//Функция закрытия окна с большой фотографией
function closeBigPictureWindow() {
  bigPictureWindow.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onBigPictureWindowEscKeydown);
  bigPictureWindowCloseButton.removeEventListener('click', closeBigPictureWindow);
  showMoreCommentsButton.removeEventListener('click', showMoreComments);
}

//Обработчик события нажатия клавиши ESС при открытом окне с большой фотографией
function onBigPictureWindowEscKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeBigPictureWindow();
  }
}

export {openBigPictureWindow};
