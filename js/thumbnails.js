import {getPhotoExpositions} from './data.js';
import {openBigPicture} from './big-picture.js';

//Функция по отрисовке фотографий
const renderThumbnails = function(photosArray = getPhotoExpositions()) {
  const picturesContainer = document.querySelector('.pictures');
  const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');//Шаблон фотографии
  const picturesListFragment = document.createDocumentFragment();

  photosArray.forEach((photo) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__likes').textContent = photo.likes;
    pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;
    pictureElement.querySelector('.picture__img').src = photo.url;
    pictureElement.addEventListener('click', (evt) => {
      evt.preventDefault();
      openBigPicture(photo);
    });
    picturesListFragment.append(pictureElement);
  });

  picturesContainer.append(picturesListFragment);
};

export {renderThumbnails};
