import checkNumInputs from './checkNumInputs';

/* eslint no-param-reassign: "error" */
const forms = (state) => {
  const form = document.querySelectorAll('form');
  const inputs = document.querySelectorAll('input');

  checkNumInputs('input[name="user_phone"]');

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

      if (item.getAttribute('data-calc') === 'end') {
        /* eslint-disable */
        for (const key in state) {
          formData.append(key, state[key]);
        }
        /* eslint-enable */
      }

      postData('assets/server.php', formData)
        .then((res) => {
          console.log(res);
          statusMessage.textContent = message.success;
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
