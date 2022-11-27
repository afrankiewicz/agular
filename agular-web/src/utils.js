export function getToken() {
  return localStorage.getItem('token');
}

export function getUserData() {
  const token = localStorage.getItem('token');
  return parseJwt(token);
}

export function setSession(userToken) {
  localStorage.setItem('token', userToken);
  return userToken;
}

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};