const BASE_URL = 'http://localhost:8080';

const onLoginSubmit = async () => {
  var data = readFormData();
  const response = await fetch(`${BASE_URL}/api/auth`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  if (result?.status) {
    localStorage.setItem('token', JSON.stringify(result?.data?.token));
    localStorage.setItem('user', JSON.stringify(result?.data?.user));
    if (result?.data?.user?.type == 'admin') {
      window.location.href = '/public/index.html';
    } else {
      window.location.href = '/public/books.html';
    }
  } else {
    document.getElementById('error-text').innerHTML =
      'Invalid username or password';
  }
};

const readFormData = () => {
  var formData = {};
  formData['email'] = document.getElementById('email').value;
  formData['password'] = document.getElementById('password').value;
  return formData;
};
