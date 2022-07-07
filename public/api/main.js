const handleUserLogout = () => {
  localStorage.clear();
  window.location.href = '/public/pages/login.html';
};
