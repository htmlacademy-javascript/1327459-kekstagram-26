const picture = document.querySelector('.img-upload__preview img');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectLevelInput = document.querySelector('.effect-level__value');

let currentCssFilterProperty = '';
let currentCssFilterPropertyUnit = '';

const effectsDataList = {
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

const applyClass = (effectClass) => {
  picture.className = '';
  picture.classList.add(effectClass);
};

const updateSliderSettings = (settings) => {
  effectLevelSlider.noUiSlider.updateOptions(settings);
};

const resetPictureEffects = () => {
  picture.classList = '';
  picture.style.filter = '';
};

const resetSliderSettings = () => {
  effectLevelSlider.style.display = 'none';
};

const onPictureEffectsControlChange = (evt) => {
  if (evt.target.closest('input[type="radio"].effects__radio')) {
    const currentKey = effectsDataList[evt.target.value];

    applyClass(currentKey.class);

    const currentVisibility = currentKey.display;
    effectLevelSlider.style.display = currentVisibility;

    currentCssFilterProperty = currentKey.filter;
    currentCssFilterPropertyUnit = currentKey.unit;
    picture.style.filter = '';

    updateSliderSettings(currentKey.settings);
  }
};

export {resetPictureEffects, resetSliderSettings, onPictureEffectsControlChange};
