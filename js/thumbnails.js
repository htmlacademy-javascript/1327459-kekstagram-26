import {GENERATED_PHOTOS_DATA} from './data.js';
import { openBigPictureWindow } from './big-picture.js';

//Функция по отрисовке миниатюр фотографий
function renderThumbnails(photosArray) {
  const thumbnailsContainer = document.querySelector('.pictures');
  const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');
  const thumbnailsListFragment = document.createDocumentFragment();

  photosArray.forEach(({likes, comments, url, id}) => {
    const thumbnailElement = thumbnailTemplate.cloneNode(true);
    thumbnailElement.querySelector('.picture__likes').textContent = likes;
    thumbnailElement.querySelector('.picture__comments').textContent = comments.length;
    thumbnailElement.querySelector('.picture__img').src = url;
    thumbnailElement.dataset.index = id;
    thumbnailsListFragment.append(thumbnailElement);
  });

  thumbnailsContainer.append(thumbnailsListFragment);
  //Добавляем обработчик события по клику для открытия модального окна с большой фотографией
  thumbnailsContainer.addEventListener('click', (evt) => {
    openBigPictureWindow(evt);
  });
}

//Отрисовываем миниатюры фотографий на основе сгенерированных данных
renderThumbnails(GENERATED_PHOTOS_DATA);
