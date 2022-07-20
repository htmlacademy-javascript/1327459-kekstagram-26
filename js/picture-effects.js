const pictureEffectsControl = document.querySelector('.img-upload__effects');
const effectsControlList = pictureEffectsControl.querySelector('.effects__list');
// const effectsControlItem = pictureEffectsControl.querySelector('.effects__item');
// const effectControlInput = pictureEffectsControl.querySelector('input[type="radio"].effects__radio');
const picture = document.querySelector('.img-upload__preview img');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectLevelInput = document.querySelector('.effect-level__value');
let currentCssFilterProperty = '';
let currentCssFilterPropertyUnit = '';

effectLevelInput.style.display = 'block';
effectLevelInput.style.color = 'black';

const effectsClassList = {
  none: {
    class: 'effects__preview--none',
    settings: {range: {min: 0, max: 1}, start: 0, step: 0.1, connect: 'lower'},
    filter: '',
    unit: '',
    display: 'none'
  },
  chrome: {
    class: 'effects__preview--chrome',
    settings: {range: {min: 0, max: 1}, start: 1, step: 0.1, connect: 'lower'},
    filter: 'grayscale',
    unit: '',
    display: 'block'
  },
  sepia: {
    class: 'effects__preview--sepia',
    settings: {range: {min: 0, max: 1}, start: 1, step: 0.1, connect: 'lower'},
    filter: 'sepia',
    unit: '',
    display: 'block'
  },
  marvin: {
    class: 'effects__preview--marvin',
    settings: {range: {min: 0, max: 100}, start: 100, step: 1, connect: 'lower'},
    filter: 'invert',
    unit: '%',
    display: 'block'
  },
  phobos: {
    class: 'effects__preview--phobos',
    settings: {range: {min: 0, max: 3}, start: 3, step: 0.1, connect: 'lower'},
    filter: 'blur',
    unit: 'px',
    display: 'block'
  },
  heat: {
    class: 'effects__preview--heat',
    settings: {range: {min: 1, max: 3}, start: 3, step: 0.1, connect: 'lower'},
    filter: 'brightness',
    unit: '',
    display: 'block'
  },
};

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
  picture.style.filter = `${currentCssFilterProperty}(${effectLevelInput.value}${currentCssFilterPropertyUnit})`;
});

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

    const currentVisibility = effectsClassList[evt.target.value].display;
    effectLevelSlider.style.display = currentVisibility;

    currentCssFilterProperty = effectsClassList[evt.target.value].filter;
    currentCssFilterPropertyUnit = effectsClassList[evt.target.value].unit;
    picture.style = '';
  }
});
