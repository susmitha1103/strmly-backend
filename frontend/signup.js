import { fetchWithAuth } from './utils.js';

document.getElementById('signupForm').addEventListener('submit', async e => {
  e.preventDefault();
  const username = e.target.username.value;
  const email    = e.target.email.value;
  const password = e.target.password.value;

  try {
    const data = await fetchWithAuth('http://localhost:5000/users/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password })
    });
    alert(data.message);
    if (data.token) {
      localStorage.setItem('token', data.token);
      window.location = 'upload.html';
    }
  } catch (err) {
    console.error(err);
    alert('Signup failed');
  }
});