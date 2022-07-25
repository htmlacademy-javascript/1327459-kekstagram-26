//Функция по отрисовке миниатюр фотографий
function renderThumbnails(photos) {
  const thumbnailsContainer = document.querySelector('.pictures');
  const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');
  const thumbnailsListFragment = document.createDocumentFragment();

  thumbnailsContainer.querySelectorAll('.picture').forEach((picture) => picture.remove());

  photos.forEach(({likes, comments, url, id}) => {
    const thumbnailElement = thumbnailTemplate.cloneNode(true);
    thumbnailElement.querySelector('.picture__likes').textContent = likes;
    thumbnailElement.querySelector('.picture__comments').textContent = comments.length;
    thumbnailElement.querySelector('.picture__img').src = url;
    thumbnailElement.dataset.index = id;
    thumbnailsListFragment.append(thumbnailElement);
  });

  thumbnailsContainer.append(thumbnailsListFragment);
}

export {renderThumbnails};
