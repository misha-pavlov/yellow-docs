import { constants } from '../../config';

export const getToken = () =>
  new Promise(resolve =>
    setTimeout(() => {
      const token = localStorage.getItem(constants.localStorageKeys.token);
      resolve(token);
    }, 3000)
  ).catch(error => console.error('Token error = ', error));
