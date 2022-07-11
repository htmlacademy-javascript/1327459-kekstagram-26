//Функция открытия большого изображения и заполнения данными
const openBigPicture = function(photo) {
  const bigPicture = document.querySelector('.big-picture');
  const bigPictureImage = document.querySelector('.big-picture__img');
  const closeButton = bigPicture.querySelector('#picture-cancel');
  const commentsCounter = bigPicture.querySelector('.social__comment-count');
  const commentsLoaderButton = bigPicture.querySelector('.social__comments-loader');

  bigPictureImage.querySelector('img').src = photo.url;
  bigPicture.querySelector('.likes-count').textContent = photo.likes;
  bigPicture.querySelector('.comments-count').textContent = photo.comments.length;
  bigPicture.querySelector('.social__caption').textContent = photo.description;

  const commentsList = bigPicture.querySelector('.social__comments');
  commentsList.innerHTML = '';

  photo.comments.forEach((comment) => {
    const commentsItem = document.createElement('li');
    commentsItem.classList.add('social__comment');

    const socialImage = document.createElement('img');
    socialImage.classList.add('social__picture');
    socialImage.src = comment.avatar;
    socialImage.alt = comment.name;
    socialImage.width = 35;
    socialImage.height = 35;
    commentsItem.append(socialImage);

    const socialText = document.createElement('p');
    socialText.classList.add('social__text');
    socialText.textContent = comment.message;
    commentsItem.append(socialText);

    commentsList.append(commentsItem);
  });

  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  commentsCounter.classList.add('hidden');
  commentsLoaderButton.classList.add('hidden');

  closeButton.addEventListener('click', () => {
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
  });

  document.addEventListener('keydown', (evt) => {
    if (evt.code === 'Escape') {
      bigPicture.classList.add('hidden');
      document.body.classList.remove('modal-open');
    }
  });
};

export {openBigPicture};
