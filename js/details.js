
function getParam(name){
    const url = new URL(window.location.href);
    return url.searchParams.get(name);
  }
  
  const stateEl   = document.getElementById('detailsState');
  const cardEl    = document.getElementById('detailsCard');
  
  const elName    = document.getElementById('coffeeName');
  const elOrigin  = document.getElementById('coffeeOrigin');
  const elCaff    = document.getElementById('coffeeCaffeine');
  const elId      = document.getElementById('coffeeId');
  const elNotes   = document.getElementById('coffeeNotes');
  const elImg     = document.getElementById('coffeeImage');
  const tryAnother= document.getElementById('tryAnother');
  
  async function loadOne(){
    const id = getParam('id');
    if(!id){
      stateEl.textContent = 'No coffee selected.';
      return;
    }
  
    try{
      stateEl.textContent = 'Loading…';
      const res = await fetch('data/coffees.json');
      if(!res.ok) throw new Error('Failed to load coffees.json');
      const data = await res.json();
      const items = data.items || [];
      const item = items.find(x => String(x.id).toLowerCase() === String(id).toLowerCase());
  
      if(!item){
        stateEl.textContent = 'Coffee not found.';
        return;
      }
  
      
      elName.textContent   = item.name;
      elOrigin.textContent = item.origin;
      elCaff.textContent   = `${item.caffeine_mg} mg caffeine`;
      elId.textContent     = `id: ${item.id}`;
      elNotes.textContent  = item.notes;
  
      
      if(item.image){
        elImg.src = item.image;
        elImg.alt = item.name;
        elImg.classList.remove('d-none');
      }
  
      
      const next = (items.find(x => x.id !== item.id) || items[0])?.id || 'espresso';
      tryAnother.href = `details.html?id=${encodeURIComponent(next)}`;
  
      
      cardEl.style.display = 'block';
      stateEl.style.display = 'none';
  
    }catch(err){
      console.error(err);
      stateEl.textContent = 'Error loading data.';
    }
  }
  
  document.addEventListener('DOMContentLoaded', loadOne);
  