export function getAuthority() {
  return localStorage.getItem('authority') || 'user';
}

export function setAuthority(authority) {
  return localStorage.setItem('authority', authority);
}