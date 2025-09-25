document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const nameEl = document.getElementById('name');
    const emailEl = document.getElementById('email');
    const msgEl = document.getElementById('message');
  
    const hintName = document.getElementById('hint-name');
    const errName  = document.getElementById('err-name');
    const hintEmail= document.getElementById('hint-email');
    const errEmail = document.getElementById('err-email');
    const hintMsg  = document.getElementById('hint-msg');
    const errMsg   = document.getElementById('err-msg');
  
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const nameRe  = /^[A-Za-zÀ-ž'’\-]+(?:\s+[A-Za-zÀ-ž'’\-]+)+$/; // bar dve reči
  
    const show = (el)=> el && (el.style.display = 'block');
    const hide = (el)=> el && (el.style.display = 'none');
  
    function validateName(){
      const ok = nameRe.test(nameEl.value.trim());
      ok ? hide(errName) : show(errName);
      return ok;
    }
  
    function validateEmail(){
      const ok = emailRe.test(emailEl.value.trim());
      ok ? hide(errEmail) : show(errEmail);
      return ok;
    }
  
    function validateMsg(){
      const ok = msgEl.value.trim().length >= 10;
      ok ? hide(errMsg) : show(errMsg);
      return ok;
    }
  
    [nameEl, emailEl, msgEl].forEach(el => {
      const hint = el === msgEl ? hintMsg : (el === nameEl ? hintName : hintEmail);
      el.addEventListener('focus', ()=> show(hint));
      el.addEventListener('blur',  ()=> hide(hint));
    });
  
    nameEl.addEventListener('input', validateName);
    emailEl.addEventListener('input', validateEmail);
    msgEl.addEventListener('input', validateMsg);
  
    form.addEventListener('submit', (e) => {
      e.preventDefault();
  
      const okName = validateName();
      const okMail = validateEmail();
      const okMsg  = validateMsg();
  
      if(okName && okMail && okMsg){
        window.location.href = 'success.html';
      }else{
        const firstErr = [errName, errEmail, errMsg].find(el => el.style.display === 'block');
        if(firstErr) firstErr.scrollIntoView({behavior:'smooth', block:'center'});
      }
    });
  });
  