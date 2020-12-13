import axios from 'axios';

const get = async (url) => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  return axios
    .get(url, {
      headers,
    })
    .then((response) => response.data)
    .catch((error) => {
      throw (error.message);
    });
};

const post = async (url, body) => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  return axios
    .post(url, body, {
      headers,
    })
    .then((response) => response.data)
    .catch((error) => {
      throw (error.message);
    });
};

export {
  get,
  post,
};
