const uploadImageForm = document.querySelector('#upload-select-image');
const uploadImageOverlay = uploadImageForm.querySelector('.img-upload__overlay');
const uploadImageOverlayCloseButton = uploadImageForm.querySelector('#upload-cancel');
const uploadImageInput = uploadImageForm.querySelector('#upload-file');

//Добавляем обработчик события выбора изображения для загрузки
uploadImageInput.addEventListener('change', () => {
  openUploadImageOverlay();
});

//Добавляем обработчик события на кнопку закрытия окна загрузки изображения
uploadImageOverlayCloseButton.addEventListener('click', () => {
  closeUploadImageOverlay();
});

//Функция открытия окна загрузки изображения
function openUploadImageOverlay() {
  uploadImageOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onUploadImageOverlayEscKeydown);
}

//Функция закрытия окна загрузки изображения
function closeUploadImageOverlay() {
  uploadImageOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onUploadImageOverlayEscKeydown);
  uploadImageInput.value = '';
  // uploadImageForm.reset();
}

//Обработчик события нажатия клавиши ESС при открытом окне загрузки изображения
function onUploadImageOverlayEscKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeUploadImageOverlay();
  }
}

//Предотвращаем закрытие окна клавишей при фокусе на полях ввода
const hashtagsTextInput = uploadImageForm.querySelector('input[name="hashtags"]');
const commentTextInput = uploadImageForm.querySelector('textarea[name="description"]');
commentTextInput.addEventListener('keydown', (evt) => evt.stopPropagation());
hashtagsTextInput.addEventListener('keydown', (evt) => evt.stopPropagation());

// const pristine = new Pristine(uploadImageForm, {
//   errorClass: '',
//   successClass: '',
//   errorTextParent: '',
//   errorTextTag: 'span',
//   errorTextClass: 'form__error'
// });
