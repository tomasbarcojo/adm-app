export default function Token() {
    if (localStorage.length > 0) {
        return JSON.parse(localStorage.getItem('token'));
      } else {
        return JSON.parse(sessionStorage.getItem('token'));
      }
}