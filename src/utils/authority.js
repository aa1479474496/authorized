export function getAuthority() {
  return localStorage.getItem('authority') || 'guest';
}

export function setAuthority(authority) {
  return localStorage.setItem('authority', authority);
}