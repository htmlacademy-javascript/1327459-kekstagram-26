import './picture-effects.js';
import {setUploadImageFormSubmit, closeUploadImageOverlay} from './upload-form.js';
import { getData } from './api.js';
import {openBigPictureWindow} from './big-picture.js';
import { renderThumbnails, setThumbnailsClick } from './thumbnails.js';
import { showAlert } from './util.js';
import {showFilter, setFilterSectionClick, applyFilter} from './filter.js';
import {debounce} from './debounce.js';

getData((photosData) => {
  renderThumbnails(photosData);
  setThumbnailsClick((evt) => {
    openBigPictureWindow(evt, photosData);
  });
  showFilter();
  setFilterSectionClick(debounce((currentFilter) => {
    applyFilter(currentFilter, photosData);
  }, 500));
}, showAlert);

setUploadImageFormSubmit(closeUploadImageOverlay);
