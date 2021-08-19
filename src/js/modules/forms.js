/* eslint no-param-reassign: "error" */
const forms = () => {
  const form = document.querySelectorAll('form');
  const inputs = document.querySelectorAll('input');
  const phoneInputs = document.querySelectorAll('input[name="user_phone"]');

  phoneInputs.forEach((item) => {
    item.addEventListener('input', () => {
      item.value = item.value.replace(/\D/, '');
    });
  });

  const message = {
    loading: 'Загрузка...',
    success: 'Спасибо! Скоро мы с вами свяжемся.',
    failure: 'Что то пошло не так...',
  };

  const postData = async (url, data) => {
    document.querySelector('.status').textContent = message.loading;

    const res = await fetch(url, {
      method: 'POST',
      body: data,
    });
    /*eslint-disable */
    return await res.text();
    /* eslint-enable */
  };

  const clearInputs = () => {
    inputs.forEach((item) => {
      item.value = '';
    });
  };

  form.forEach((item) => {
    item.addEventListener('submit', (e) => {
      e.preventDefault();

      const statusMessage = document.createElement('div');
      statusMessage.classList.add('status');
      item.appendChild(statusMessage);

      const formData = new FormData(item);

      postData('../../assets/server.php', formData)
        .then((res) => {
          statusMessage.textContent = message.success;
          console.log(res);
        })
        .catch(() => {
          statusMessage.textContent = message.failure;
        })
        .finally(() => {
          clearInputs();
          setTimeout(() => {
            statusMessage.remove();
          }, 5000);
        });
    });
  });
};

export default forms;
