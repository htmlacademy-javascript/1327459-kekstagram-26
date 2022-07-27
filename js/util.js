const ALERT_SHOW_TIME = 10000;

const checkStringLength = (currentString, maxLength) => {
  currentString = String(currentString);
  return currentString.length <= maxLength;
};

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '20px 10px';
  alertContainer.style.fontFamily = '"Open Sans", "Arial", sans-serif';
  alertContainer.style.fontSize = '32px';
  alertContainer.style.fontWeight = 'bold';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';
  alertContainer.style.opacity = '0.5';
  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const showMessage = (typeOfMessage) => {
  const messageTemplate = document.querySelector(`#${typeOfMessage}`).content.querySelector(`.${typeOfMessage}`);
  const messageElement = messageTemplate.cloneNode(true);
  messageElement.style.zIndex = 100;
  document.body.append(messageElement);
  messageElement.querySelector(`.${typeOfMessage}__button`).addEventListener('click', () => {
    closeMessage();
  });
  document.addEventListener('click', onOutsideClick);
  document.addEventListener('keydown', onMessageEscKeydown);

  function closeMessage() {
    messageElement.remove();
    document.removeEventListener('click', onOutsideClick);
    document.removeEventListener('keydown', onMessageEscKeydown);
  }

  function onOutsideClick(evt) {
    if (!evt.target.closest(`div.${typeOfMessage}__inner`)) {
      closeMessage();
    }
  }

  function onMessageEscKeydown(evt) {
    if (evt.key === 'Escape') {
      closeMessage();
    }
  }
};

export {checkStringLength, showAlert, showMessage};
