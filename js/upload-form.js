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
}

//Обработчик события нажатия клавиши ESС при открытом окне загрузки изображения
function onUploadImageOverlayEscKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeUploadImageOverlay();
  }
}
