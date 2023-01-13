export const getUserData = () =>
  new Promise(resolve =>
    setTimeout(() => {
      const user = window.localStorage.getItem('user');
      resolve(user);
    }, 3000)
  ).catch(error => console.error('User error = ', error));
