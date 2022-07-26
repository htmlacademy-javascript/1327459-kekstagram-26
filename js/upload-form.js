import {checkStringLength, showMessage} from './util.js';
import {reducePictureScale, increasePictureScale, resetPictureScale} from './picture-scale.js';
import { resetPictureEffects, resetSliderSettings, onPictureEffectsControlChange } from './picture-effects.js';
import {sendData} from './api.js';

const uploadImageForm = document.querySelector('#upload-select-image');
const uploadImageFormSubmitButton = uploadImageForm.querySelector('#upload-submit');
const uploadImageOverlay = uploadImageForm.querySelector('.img-upload__overlay');
const uploadImageOverlayCloseButton = uploadImageForm.querySelector('#upload-cancel');
const hashtagsTextInput = uploadImageForm.querySelector('input[name="hashtags"]');
const commentTextInput = uploadImageForm.querySelector('textarea[name="description"]');

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const uploadImageFileInput = uploadImageForm.querySelector('#upload-file');
const uploadImagePreview = uploadImageForm.querySelector('.img-upload__preview img');

const smallerScaleButton = document.querySelector('.scale__control--smaller');
const biggerScaleButton = document.querySelector('.scale__control--bigger');

const effectsControlList = document.querySelector('.effects__list');

uploadImageFileInput.addEventListener('change', openUploadImageOverlay);

const renderPreviewImage = () => {
  const file = uploadImageFileInput.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    uploadImagePreview.src = URL.createObjectURL(file);
  } else {
    showMessage('file-type-error');
    closeUploadImageOverlay();
  }
};

const openUploadImageOverlay = () => {
  uploadImageOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onUploadImageOverlayEscKeydown);
  uploadImageOverlayCloseButton.addEventListener('click', closeUploadImageOverlay);
  commentTextInput.removeAttribute('maxlength');
  smallerScaleButton.addEventListener('click', reducePictureScale);
  biggerScaleButton.addEventListener('click', increasePictureScale);
  effectsControlList.addEventListener('change', onPictureEffectsControlChange);
  resetSliderSettings();
  renderPreviewImage();
};

const closeUploadImageOverlay = () => {
  uploadImageOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onUploadImageOverlayEscKeydown);
  uploadImageOverlayCloseButton.removeEventListener('click', closeUploadImageOverlay);
  smallerScaleButton.removeEventListener('click', reducePictureScale);
  biggerScaleButton.removeEventListener('click', increasePictureScale);
  effectsControlList.removeEventListener('change', onPictureEffectsControlChange);
  pristine.reset();
  uploadImageForm.reset();
  resetPictureScale();
  resetPictureEffects();
};

const onUploadImageOverlayEscKeydown = (evt) => {
  if (evt.key === 'Escape' && (document.body.getElementsByClassName('error').length === 0)) {
    if (!Array.from(evt.target.classList).some((className) => ['text__hashtags', 'text__description'].includes(className))) {
      evt.preventDefault();
      closeUploadImageOverlay();
    }
  }
};

const checkHashtagOnSymbols = (currentValue) => {
  const re = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
  return re.test(currentValue);
};

const validateHashtagsOnSymbols = (value) => !value.length || value.split(' ').every(checkHashtagOnSymbols);

const validateHashtagsNumber = (value) => value.split(' ').length <= 5;

const validateHashtagsOnRepeat = (value) => {
  const hashtags = value.split(' ');
  return [...new Set(hashtags.map((element) => element.toLowerCase()))].length === hashtags.length;
};

const validateCommentMaxLength = (value) => checkStringLength(value, 140);

const pristine = new Pristine(uploadImageForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'has-danger',
  successClass: 'has-success',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'text-help'
});

pristine.addValidator(hashtagsTextInput, validateHashtagsOnSymbols, '- *Хеш-теги должны начинаться с "#" и содержать от 1 до 19 символов;<br>- *Хеш-теги должны разделяться между собой пробелами.');
pristine.addValidator(hashtagsTextInput, validateHashtagsNumber, '*Допускается не более 5-ти хеш-тегов.');
pristine.addValidator(hashtagsTextInput, validateHashtagsOnRepeat, '*Хеш-теги не должны повторяться.');
pristine.addValidator(commentTextInput, validateCommentMaxLength, '*Длина комментария не должна превышать 140 символов.', 2, true);

const setUploadImageFormSubmit = (onSuccess) => {
  uploadImageForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      uploadImageFormSubmitButton.disabled = true;
      sendData(
        () => {
          onSuccess();
          showMessage('success');
          uploadImageFormSubmitButton.disabled = false;
        },
        () => {
          showMessage('error');
          uploadImageFormSubmitButton.disabled = false;
        },
        new FormData(evt.target)
      );
    }
  });
};

export {setUploadImageFormSubmit, closeUploadImageOverlay};
