const RE = {
    name: /^[A-ZČĆŽŠĐ][a-zčćžšđ]+(\s[A-ZČĆŽŠĐ][a-zčćžšđ]+)+$/,  // npr. Dina Becirovic
    email:/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
    msg: /.{10,}/
  };

  function show(el){ el.syle.display = 'block';}
  function hide(el){el.style.display = 'none';}

  document.addEventListener('DOMContentLoaded', ()=>{
    const form = document.getElementById('contactForm');
    if(!form) return;

    const name = form.querySelector('#name');
    const email = form.querySelector('#email');
    const msg = form.querySelector('#message');

    const hName = form.querySelector('#hint-name');
    const hEmail = form.querySelector('#hint-email');
    const hMsg = form.querySelector('#hint-msg');

    const eName = form.querySelector('#err-name');
    const eEmail = form.querySelector('#err-email');
    const eMsg = form.querySelector('#err-msg');

    [[name,hName],[email,hEmail],[msg,hMsg]].forEach(([input,hint])=>{
        input.addEventListener('focus', ()=> show(hint));
        input.addEventListener('blur', ()=> hide(hint));
    });

    function setInvalid(input, errEl, ok){
        if(ok) {
            hide(errEl);
            input.classList.remove('is-invalid');
        } else{
            show(errEl);
            input.classList.add('is-invalid');
        }
    }

    form.addEventListener('submit', (e)=>{
        e.preventDefault90;

        const okName = RE.name.test(name.value.trim());
        const okEmail = RE.email.test(email.value.trim());
        const okMsg = RE.msg.test(msg.value.trim());

        setInvalid(name, eName, okName);
        setInvalid(email, eEmail, okMail);
        setInvalid(msg, eMsg, okMsg);

        if(okName && okMail && okMsg) {
            window.location.href='success.html';
        }
    });
  });