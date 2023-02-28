import API_BASE_URL from './../../config';
import jwtService from './jwt';

async function login(email, password) {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });

  if (response.ok) {
    const { access_token, user } = await response.json();
    jwtService.saveToken(access_token);
    localStorage.setItem(JSON.stringify(user));
    return { access_token };
  } else {
    const error = await response.json();
    throw error;
  }
}

async function register(name, email, password) {
  const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, email, password })
  });

  if (response.ok) {
    const { token } = await response.json();
    return { token };
  } else {
    const error = await response.json();
    throw error;
  }
}

async function logout() {
  localStorage.removeItem('jwtToken');
  localStorage.removeItem('user');
}

async function isLoggedIn() {
  const token = localStorage.getItem('jwtToken');
  if (!token) {
    return false;
  }

  const response = await fetch(`${API_BASE_URL}/api/auth/refresh`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  });

  if (response.ok) {
    return true;
  } else {
    localStorage.removeItem('jwtToken');
    return false;
  }
}

export default { login, register, logout, isLoggedIn };
