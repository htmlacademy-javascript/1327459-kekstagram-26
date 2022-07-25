const filterSection = document.querySelector('.img-filters');

function showFilter() {
  filterSection.classList.remove('img-filters--inactive');
  filterSection.addEventListener('click', onfilterButtonClick);
}

function onfilterButtonClick(evt) {
  const eventTarget = evt.target.closest('.img-filters__button');
  if (eventTarget) {
    const filterButtons = filterSection.querySelectorAll('.img-filters__button');
    filterButtons.forEach((filterButton) => filterButton.classList.remove('img-filters__button--active'));
    eventTarget.classList.add('img-filters__button--active');
  }
}

export {showFilter};
