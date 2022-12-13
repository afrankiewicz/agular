export function getToken() {
  return localStorage.getItem('token');
}

export function getUserData() {
  const token = localStorage.getItem('token');
  return parseJwt(token);
}

export function setToken(userToken) {
  localStorage.setItem('token', userToken);
  return userToken;
}

export function clearSession() {
  localStorage.removeItem('token');
}

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};