document.addEventListener('DOMContentLoaded', () => {
    const form     = document.getElementById('loginForm');
    const btn      = document.getElementById('loginBtn');
    const userInp  = document.getElementById('username');
    const passInp  = document.getElementById('password');
    const errUser  = document.getElementById('err-user');
    const errPass  = document.getElementById('err-pass');
    const errAuth  = document.getElementById('err-auth');
  
    function show(el){ el.hidden = false; }
    function hide(el){ el.hidden = true; }
  
    function isEmail(v){ return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }
    function isUsername(v){ return /^[a-zA-Z0-9_.-]{2,}$/.test(v); }
  
    async function sha256Hex(text){
      const enc = new TextEncoder().encode(text);
      const buf = await crypto.subtle.digest('SHA-256', enc);
      return [...new Uint8Array(buf)].map(b=>b.toString(16).padStart(2,'0')).join('');
    }
  
    async function loadUsers(){
      const res = await fetch('data/users.json');
      if(!res.ok) throw new Error('Failed to load users.json');
      const data = await res.json();
      return data.users || [];
    }
  
    function validate(){
      const id = userInp.value.trim();
      const pw = passInp.value;
      let ok = true;
  
      if(!(isEmail(id) || isUsername(id))){ show(errUser); ok = false; } else hide(errUser);
      if(pw.length < 6){ show(errPass); ok = false; } else hide(errPass);
  
      return { ok, id, pw };
    }
  
    userInp.addEventListener('input', () => hide(errUser));
    passInp.addEventListener('input', () => { if(passInp.value.length >= 6) hide(errPass); });
  
    async function handleSubmit(e){
      e.preventDefault();
      const { ok, id, pw } = validate();
      if(!ok) return;
  
      hide(errAuth);
      try{
        const users = await loadUsers();
        const user = users.find(u =>
          u.email.toLowerCase() === id.toLowerCase() ||
          u.username.toLowerCase() === id.toLowerCase()
        );
        if(!user){ show(errAuth); return; }
  
        const hash = await sha256Hex(pw);
        if(hash !== user.password_hash){ show(errAuth); return; }
  
        localStorage.setItem('currentUser', JSON.stringify({id:user.id, name:user.name, email:user.email}));
        window.location.href = 'index.html';
      }catch(err){
        console.error(err);
        show(errAuth);
      }
    }
  
    form.addEventListener('submit', handleSubmit);
    btn.addEventListener('click', (e) => {
      // osiguranje da klik na dugme svakako okida istu logiku
      if(form) handleSubmit(e);
    });
  });
  