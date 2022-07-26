const getData = (onSuccess, onFail) => {
  fetch('https://26.javascript.pages.academy/kekstagram/data')
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
  fetch('https://26.javascript.pages.academy/kekstagram',
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
