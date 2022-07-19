const pictureScaleControl = document.querySelector('.img-upload__scale');
const pictureScaleInput = pictureScaleControl.querySelector('.scale__control--value');
const picture = document.querySelector('.img-upload__preview img');

const MIN_SCALE = 25;
const MAX_SCALE = 100;
const STEP = 25;

//Функция, меняющая масштаб изображения
function changePictureScale() {
  const scaleValue = parseFloat(pictureScaleInput.value);
  picture.style.transform = `scale(${scaleValue / 100})`;
}

//Функция уменьшения масштаба
function reducePictureScale() {
  const scaleValue = parseFloat(pictureScaleInput.value);
  if (scaleValue !== MIN_SCALE) {
    pictureScaleInput.value = `${scaleValue - STEP}%`;
    changePictureScale();
  }
}

//Функция увеличения масштаба
function increasePictureScale() {
  const scaleValue = parseFloat(pictureScaleInput.value);
  if (scaleValue !== MAX_SCALE) {
    pictureScaleInput.value = `${scaleValue + STEP}%`;
    changePictureScale();
  }
}

export {reducePictureScale, increasePictureScale};
