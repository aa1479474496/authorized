export function getAuthority() {
  // return localStorage.getItem('authority') || 'user';
  return localStorage.getItem('authority');
}

export function setAuthority(authority) {
  return localStorage.setItem('authority', authority);
}