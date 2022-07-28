const url = {
  GET: 'https://26.javascript.pages.academy/kekstagram/data',
  POST: 'https://26.javascript.pages.academy/kekstagram',
};

const getData = (onSuccess, onFail) => {
  fetch(url.GET)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Ошибка загрузки данных с сервера');
      }})
    .then((data) => {
      onSuccess(data);
    })
    .catch((err) => onFail(err.message));
};

const sendData = (onSuccess, onFail, body) => {
  fetch(url.POST,
    {
      method: 'POST',
      body,
      type: 'multipart/form-data',
    })
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};

export {getData, sendData};
