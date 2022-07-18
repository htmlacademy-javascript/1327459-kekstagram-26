import {GENERATED_PHOTOS_DATA} from './data.js';

const MAX_NUMBER_OF_COMMENTS_TO_SHOW = 5;
const bigPictureWindow = document.querySelector('.big-picture');
const bigPictureWindowCloseButton = bigPictureWindow.querySelector('#picture-cancel');

//Функция заполнения данными окна с большой фотографией
function createBigPictureWindow(photosDataArray, elementDataIndex) {
  //Находим нужный элемент массива из фотографий по совпадающему id
  const photo = photosDataArray.find((photoElement) => photoElement.id === elementDataIndex);

  //Заполняем модальное окно данными
  bigPictureWindow.querySelector('.big-picture__img img').src = photo.url;
  bigPictureWindow.querySelector('.big-picture__img img').alt = 'Случайная фотография';
  bigPictureWindow.querySelector('.likes-count').textContent = photo.likes;
  bigPictureWindow.querySelector('.social__caption').textContent = photo.description;

  //Создаем комментарии
  const commentsList = bigPictureWindow.querySelector('.social__comments');
  const commentsListFragment = document.createDocumentFragment();
  commentsList.innerHTML = '';
  let commentsCounter = 0;
  photo.comments.forEach((comment) => {
    commentsCounter = commentsCounter + 1;
    const commentsItem = document.createElement('li');
    commentsItem.classList.add('social__comment');
    if (commentsCounter > MAX_NUMBER_OF_COMMENTS_TO_SHOW) {
      commentsItem.classList.add('hidden');
    }

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

    commentsListFragment.append(commentsItem);
  });

  //Передаем кол-во показанных комментариев и общее кол-во комментариев
  let shownCommentsNumber;
  if (photo.comments.length < MAX_NUMBER_OF_COMMENTS_TO_SHOW) {
    shownCommentsNumber = photo.comments.length;
  } else {
    shownCommentsNumber = MAX_NUMBER_OF_COMMENTS_TO_SHOW;
  }
  bigPictureWindow.querySelector('.social__comment-count').textContent = `${shownCommentsNumber} из ${photo.comments.length} комментариев`;

  commentsList.append(commentsListFragment);
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
  }
}

//Функция закрытия окна с большой фотографией
function closeBigPictureWindow() {
  bigPictureWindow.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onBigPictureWindowEscKeydown);
  bigPictureWindowCloseButton.removeEventListener('click', closeBigPictureWindow);
}

//Обработчик события нажатия клавиши ESС при открытом окне с большой фотографией
function onBigPictureWindowEscKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeBigPictureWindow();
  }
}

export {openBigPictureWindow};
