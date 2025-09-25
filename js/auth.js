document.addEventListener('DOMContentLoaded', () => {
    const protectedPaths = ['contact.html', 'catalog.html', 'details.html'];
    const userJson = localStorage.getItem('currentUser');
    const user = userJson ? JSON.parse(userJson) : null;
  
    const reqLinks = document.querySelectorAll('.requires-auth');
    const loginLink = document.getElementById('loginLink');
    const logoutLink = document.getElementById('logoutLink');
    const userName = document.getElementById('userName');
  
    const isLogged = !!user;
  
    reqLinks.forEach(a => a.closest('.nav-item').classList.toggle('d-none', !isLogged));
    if (loginLink) loginLink.closest('.nav-item').classList.toggle('d-none', isLogged);
    if (logoutLink) logoutLink.closest('.nav-item').classList.toggle('d-none', !isLogged);
    if (userName) {
      userName.closest('.nav-item').classList.toggle('d-none', !isLogged);
      if (isLogged) userName.textContent = user.name || user.email || 'User';
    }
  
    const here = location.pathname.split('/').pop() || 'index.html';
    if (!isLogged && protectedPaths.includes(here)) {
      const back = encodeURIComponent(here + (location.search || ''));
      location.href = `login.html?redirect=${back}`;
      return;
    }
  
    if (logoutLink) {
      logoutLink.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('currentUser');
        if (protectedPaths.includes(here)) location.href = 'index.html';
        else location.reload();
      });
    }
  });
  