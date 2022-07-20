const pictureEffectsControl = document.querySelector('.img-upload__effects');
const effectsControlList = pictureEffectsControl.querySelector('.effects__list');
// const effectsControlItem = pictureEffectsControl.querySelector('.effects__item');
// const effectControlInput = pictureEffectsControl.querySelector('input[type="radio"].effects__radio');
const picture = document.querySelector('.img-upload__preview img');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectLevelInput = document.querySelector('.effect-level__value');

effectLevelInput.style.display = 'block';
effectLevelInput.style.color = 'black';

noUiSlider.create(effectLevelSlider, {
  range: {
    min: 0,
    max: 1,
  },
  start: 0,
  step: 0.1,
  connect: 'lower',
});

effectLevelSlider.noUiSlider.on('update', () => {
  effectLevelInput.value = effectLevelSlider.noUiSlider.get();
});

const effectsClassList = {
  none: {class: 'effects__preview--none', settings: {range: {min: 0, max: 1}, start: 0, step: 0.1, connect: 'lower'}},
  chrome: {class: 'effects__preview--chrome', settings: {range: {min: 0, max: 1}, start: 0, step: 0.1, connect: 'lower'}},
  sepia: {class: 'effects__preview--sepia', settings: {range: {min: 0, max: 1}, start: 0, step: 0.1, connect: 'lower'}},
  marvin: {class: 'effects__preview--marvin', settings: {range: {min: 0, max: 100}, start: 0, step: 1, connect: 'lower'}},
  phobos: {class: 'effects__preview--phobos', settings: {range: {min: 0, max: 3}, start: 0, step: 0.1, connect: 'lower'}},
  heat: {class: 'effects__preview--heat', settings: {range: {min: 1, max: 3}, start: 0, step: 0.1, connect: 'lower'}},
};

//Функция применения фильтра к текущей фотографии
function applyEffect(effectClass) {
  picture.className = '';
  picture.classList.add(effectClass);
}

//Функция обновления параметров слайдера
function updateSliderSettings(settings) {
  effectLevelSlider.noUiSlider.updateOptions(settings);
}

effectsControlList.addEventListener('change', (evt) => {
  if (evt.target.closest('input[type="radio"].effects__radio')) {
    const currentEffectClass = effectsClassList[evt.target.value].class;
    applyEffect(currentEffectClass);

    const currentSettings = effectsClassList[evt.target.value].settings;
    updateSliderSettings(currentSettings);
  }
});
