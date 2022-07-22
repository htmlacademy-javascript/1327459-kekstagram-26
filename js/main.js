import './upload-form.js';
import './picture-effects.js';
import { getData } from './api.js';
import { renderThumbnails } from './thumbnails.js';
import {openBigPictureWindow} from './big-picture.js';
import { showAlert } from './util.js';

const thumbnailsContainer = document.querySelector('.pictures');

getData((photosData) => {
  renderThumbnails(photosData);
  thumbnailsContainer.addEventListener('click', (evt) => {
    openBigPictureWindow(evt, photosData);
  });
}, showAlert);
