const MIN_SCALE = 25;
const MAX_SCALE = 100;
const STEP = 25;

const pictureScaleControl = document.querySelector('.img-upload__scale');
const pictureScaleInput = pictureScaleControl.querySelector('.scale__control--value');
const picture = document.querySelector('.img-upload__preview img');

const changePictureScale = () => {
  const scaleValue = parseFloat(pictureScaleInput.value);
  picture.style.transform = `scale(${scaleValue / 100})`;
};

const reducePictureScale = () => {
  const scaleValue = parseFloat(pictureScaleInput.value);
  if (scaleValue !== MIN_SCALE) {
    pictureScaleInput.value = `${scaleValue - STEP}%`;
    changePictureScale();
  }
};

const increasePictureScale = () => {
  const scaleValue = parseFloat(pictureScaleInput.value);
  if (scaleValue !== MAX_SCALE) {
    pictureScaleInput.value = `${scaleValue + STEP}%`;
    changePictureScale();
  }
};

const resetPictureScale = () => {
  picture.style.transform = '';
};

export {reducePictureScale, increasePictureScale, resetPictureScale};
