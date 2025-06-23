import { fetchWithAuth } from './utils.js';

document.getElementById('loginForm').addEventListener('submit', async e => {
  e.preventDefault();

  const email    = e.target.email.value;
  const password = e.target.password.value;

  try {
    const data = await fetchWithAuth('http://localhost:5000/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    alert(data.message);
    if (data.token) {
      localStorage.setItem('token', data.token);
      window.location = 'upload.html';
    }
  } catch (err) {
    console.error(err);
    alert('login failed');
  }
});