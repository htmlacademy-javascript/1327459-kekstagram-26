import './picture-effects.js';
import {setUploadImageFormSubmit, closeUploadImageOverlay} from './upload-form.js';
import { getData } from './api.js';
import {openBigPictureWindow} from './big-picture.js';
import { renderThumbnails, setThumbnailsClick } from './thumbnails.js';
import { showAlert } from './util.js';
import {showFilter, setFilterSectionClick, applyFilter} from './filter.js';

getData((photosData) => {
  renderThumbnails(photosData);
  setThumbnailsClick((evt) => {
    openBigPictureWindow(evt, photosData);
  });
  showFilter();
  setFilterSectionClick((currentFilter) => {
    applyFilter(currentFilter, photosData);
  });
}, showAlert);

setUploadImageFormSubmit(closeUploadImageOverlay);
