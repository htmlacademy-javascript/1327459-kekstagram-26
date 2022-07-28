import {renderThumbnails} from './thumbnails.js';

const RANDOM_PICURES_COUNT = 10;
const filterSection = document.querySelector('.img-filters');

const showFilter = () => {
  filterSection.classList.remove('img-filters--inactive');
};

const setFilterSectionClick = (cb) => {
  filterSection.addEventListener('click', (evt) => {
    const eventTarget = evt.target.closest('.img-filters__button');
    if (eventTarget) {
      const currentFilter = eventTarget.id;
      const filterButtons = filterSection.querySelectorAll('.img-filters__button');
      filterButtons.forEach((filterButton) => filterButton.classList.remove('img-filters__button--active'));
      eventTarget.classList.add('img-filters__button--active');
      cb(currentFilter);
    }
  });
};

const getRandomPhotos = (photosData) => photosData.slice().sort(() => Math.random() - 0.5).slice(0, RANDOM_PICURES_COUNT);

const comparePhotosByCommentsNumber = (photoA, photoB) => photoB.comments.length - photoA.comments.length;

const sortPhotosByCommentsNumber = (photosData) => photosData.slice().sort(comparePhotosByCommentsNumber);

const applyFilter = (typeOfFilter, photosData) => {
  if (typeOfFilter === 'filter-default') {
    renderThumbnails(photosData);
  }
  if (typeOfFilter === 'filter-random') {
    const randomPhotos = getRandomPhotos(photosData);
    renderThumbnails(randomPhotos);
  }
  if (typeOfFilter === 'filter-discussed') {
    const discussedPhotos = sortPhotosByCommentsNumber(photosData);
    renderThumbnails(discussedPhotos);
  }
};

export {showFilter, setFilterSectionClick, applyFilter};
