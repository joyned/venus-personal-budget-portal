import axios from 'axios';

const doGet = async <Type>(uri: string) => {
  return new Promise<Type>((resolve, reject) => {
    axios
      .get(`${process.env.REACT_APP_API_URL}${uri}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error.response);
      });
  });
};

const doPost = async <Type>(uri: string, body: Type) => {
  return new Promise<Type>((resolve, reject) => {
    const token = localStorage.getItem('token');
    axios
      .post(`${process.env.REACT_APP_API_URL}${uri}`, body, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error.response);
      });
  });
};

const doDelete = async <Type>(uri: string) => {
  return new Promise<Type>((resolve, reject) => {
    const token = localStorage.getItem('token');
    axios
      .delete(`${process.env.REACT_APP_API_URL}${uri}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error.response);
      });
  });
};

export { doGet, doPost, doDelete };
