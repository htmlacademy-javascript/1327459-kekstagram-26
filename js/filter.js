import { getRandomUniqIntNumbersFromRange } from './util.js';
import {renderThumbnails} from './thumbnails.js';

const filterSection = document.querySelector('.img-filters');

let currentFilter = 'filter-default';

function showFilter(photosData) {
  filterSection.classList.remove('img-filters--inactive');
  filterSection.addEventListener('click', onfilterButtonClick);

  function onfilterButtonClick(evt) {
    const eventTarget = evt.target.closest('.img-filters__button');
    if (eventTarget) {
      const filterButtons = filterSection.querySelectorAll('.img-filters__button');
      filterButtons.forEach((filterButton) => filterButton.classList.remove('img-filters__button--active'));
      eventTarget.classList.add('img-filters__button--active');

      currentFilter = eventTarget.id;
      applyFilter(currentFilter, photosData);
    }
  }
}

function applyFilter(typeOfFilter, photosData) {
  if (typeOfFilter === 'filter-default') {
    renderThumbnails(photosData);
  }
  if (typeOfFilter === 'filter-random') {
    const randomPhotos = getRandomPhotos(photosData, 10);
    renderThumbnails(randomPhotos);
  }
  if (typeOfFilter === 'filter-discussed') {
    const discussedPhotos = sortPhotosByCommentsNumber(photosData);
    renderThumbnails(discussedPhotos);
  }
}


function getRandomPhotos(photosData, number) {
  const randomIdNumbers = getRandomUniqIntNumbersFromRange(0, 24, number);
  return photosData.filter((photo) => randomIdNumbers.includes(photo.id));
}

function sortPhotosByCommentsNumber(photosData) {
  return photosData.slice().sort(comparePhotosByCommentsNumber);
}

function comparePhotosByCommentsNumber(photoA, photoB) {
  return photoB.comments.length - photoA.comments.length;
}

export {showFilter};
