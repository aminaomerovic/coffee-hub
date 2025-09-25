
const I18N = (() => {
  let cache = null, lang = null;
  return {
    async t(key, fallback = "") {
      const l = localStorage.getItem('lang') || 'en';
      if (!cache || lang !== l) {
        const res = await fetch(`data/lang-${l}.json`);
        cache = await res.json();
        lang = l;
      }
      return (cache[key] !== undefined ? cache[key] : (fallback || key));
    }
  };
})();

function getParam(name){
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}

const stateEl    = document.getElementById('detailsState');
const cardEl     = document.getElementById('detailsCard');

const elName     = document.getElementById('coffeeName');
const elOrigin   = document.getElementById('coffeeOrigin');
const elCaff     = document.getElementById('coffeeCaffeine');
const elId       = document.getElementById('coffeeId');
const elNotes    = document.getElementById('coffeeNotes');
const elImg      = document.getElementById('coffeeImage');
const tryAnother = document.getElementById('tryAnother');

async function setState(key, fallback){
  stateEl.textContent = await I18N.t(key, fallback);
  stateEl.style.display = 'block';
}

async function loadOne(){
  const id = getParam('id');
  if(!id){
    await setState('detailsNoCoffee', 'No coffee selected.');
    return;
  }

  try{
    await setState('loading', 'Loading…');

    const lang = localStorage.getItem('lang') || 'en';
    const DATA_URL = `data/coffees-${lang}.json`;

    const res = await fetch(DATA_URL);
    if(!res.ok) throw new Error(`Failed to load ${DATA_URL}`);
    const data = await res.json();
    const items = data.items || [];
    const item = items.find(x => String(x.id).toLowerCase() === String(id).toLowerCase());

    if(!item){
      await setState('detailsNotFound', 'Coffee not found.');
      return;
    }
    elName.textContent   = item.name;
    elOrigin.textContent = item.origin;

    const unit = await I18N.t('caffeineUnit', 'mg caffeine');
    elCaff.textContent   = `${item.caffeine_mg} ${unit}`;

    const idLabel = await I18N.t('idLabel', 'id');
    elId.textContent     = `${idLabel}: ${item.id}`;

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
    await setState('detailsError', 'Error loading data.');
  }
}

document.addEventListener('DOMContentLoaded', loadOne);
