export default function Token() {
  if (localStorage.length > 0) {
    return JSON.parse(localStorage.getItem('access_token'));
  } else {
    return JSON.parse(sessionStorage.getItem('access_token'));
  }
}
