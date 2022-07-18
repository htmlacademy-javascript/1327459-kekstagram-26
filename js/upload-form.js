import {checkStringLength} from './util.js';

const uploadImageForm = document.querySelector('#upload-select-image');
const uploadImageOverlay = uploadImageForm.querySelector('.img-upload__overlay');
const uploadImageOverlayCloseButton = uploadImageForm.querySelector('#upload-cancel');
const uploadImageInput = uploadImageForm.querySelector('#upload-file');
const hashtagsTextInput = uploadImageForm.querySelector('input[name="hashtags"]');
const commentTextInput = uploadImageForm.querySelector('textarea[name="description"]');

const pristine = new Pristine(uploadImageForm, {
  // class of the parent element where the error/success class is added
  classTo: 'img-upload__field-wrapper',
  errorClass: 'has-danger',
  successClass: 'has-success',
  // class of the parent element where error text element is appended
  errorTextParent: 'img-upload__field-wrapper',
  // type of element to create for the error text
  errorTextTag: 'div',
  // class of the error text element
  errorTextClass: 'text-help'
});

//Добавляем обработчик события выбора изображения для загрузки
uploadImageInput.addEventListener('change', () => {
  openUploadImageOverlay();
});

//Функция открытия окна загрузки изображения
function openUploadImageOverlay() {
  uploadImageOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onUploadImageOverlayEscKeydown);
  uploadImageOverlayCloseButton.addEventListener('click', closeUploadImageOverlay);
  commentTextInput.removeAttribute('maxlength');
}

// Функция сброса поля ввода и сообщений об ошибках
function resetInputValueAndErrorMessages(targetInput) {
  targetInput.value = '';
  pristine.reset();
}

//Функция закрытия окна загрузки изображения
function closeUploadImageOverlay() {
  uploadImageOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onUploadImageOverlayEscKeydown);
  uploadImageOverlayCloseButton.removeEventListener('click', closeUploadImageOverlay);
  resetInputValueAndErrorMessages(uploadImageInput);
}

//Обработчик события нажатия клавиши ESС при открытом окне загрузки изображения
function onUploadImageOverlayEscKeydown(evt) {
  if (evt.key === 'Escape') {
    if (!Array.from(evt.target.classList).some((className) => ['text__hashtags', 'text__description'].includes(className))) {
      evt.preventDefault();
      closeUploadImageOverlay();
    }
  }
}

//Реализуем валидацию полей ввода:

//Функция проверки хеш-тега на символы
function checkHashtagOnSymbols(currentValue) {
  const re = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
  return re.test(currentValue);
}

//Функция для валидации всех хеш-тегов на символы
function validateHashtagsOnSymbols(value) {
  return !value.length || value.split(' ').every(checkHashtagOnSymbols);
}

pristine.addValidator(hashtagsTextInput, validateHashtagsOnSymbols, '- *Хеш-теги должны начинаться с "#" и содержать от 1 до 19 символов;<br>- *Хеш-теги должны разделяться между собой пробелами.');

// Функция проверки допустимого количества хештегов
function validateHashtagsNumber (value) {
  return value.split(' ').length <= 5;
}

pristine.addValidator(hashtagsTextInput, validateHashtagsNumber, '*Допускается не более 5-ти хеш-тегов.');

// Функция проверки хеш-тегов на повторяемость
function validateHashtagsOnRepeat (value) {
  const hashtags = value.split(' ');
  return [...new Set(hashtags.map((element) => element.toLowerCase()))].length === hashtags.length;
}

pristine.addValidator(hashtagsTextInput, validateHashtagsOnRepeat, '*Хеш-теги не должны повторяться.');

// Функция проверки максимальной длины комментария
function validateCommentMaxLength(value) {
  return checkStringLength(value, 140);
}

pristine.addValidator(commentTextInput, validateCommentMaxLength, '*Длина комментария не должна превышать 140 символов.', 2, true);

uploadImageForm.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();
  if (!isValid) {
    evt.preventDefault();
  }
});
