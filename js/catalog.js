const grid     = document.getElementById('coffeeGrid');
const stateEl  = document.getElementById('catalogState');
const searchEl = document.getElementById('search');

let ALL = [];

function showState(msg){ stateEl.textContent = msg; stateEl.style.display = 'block'; }
function hideState(){ stateEl.style.display = 'none'; }

function render(list){
  grid.innerHTML = '';
  if(!list.length){ showState('No coffees found.'); return; }
  hideState();

  list.forEach(item=>{
    grid.insertAdjacentHTML('beforeend', `
      <div class="col">
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">
              <span>${item.name}</span>
              <span class="badge badge-caf">${item.caffeine_mg} mg</span>
            </h5>
            <h6 class="card-subtitle mb-2 text-muted">${item.origin}</h6>
            <p class="card-text">${item.notes}</p>
            <a class="btn btn-brand btn-sm" href="details.html?id=${encodeURIComponent(item.id)}">Details</a>
          </div>
        </div>
      </div>
    `);
  });
}

function filterList(q){
  q = q.trim().toLowerCase();
  if(!q) return ALL;
  return ALL.filter(it =>
    it.name.toLowerCase().includes(q) ||
    it.origin.toLowerCase().includes(q)
  );
}

async function load(){
  try{
    showState('Loading…');
    const res = await fetch('data/coffees.json');
    if(!res.ok) throw new Error('Failed to load coffees.json');
    const data = await res.json();
    ALL = data.items || [];
    render(ALL);
  }catch(err){
    console.error(err);
    showState('Error loading data.');
  }
}

document.addEventListener('DOMContentLoaded', ()=>{
  load();
  searchEl.addEventListener('input', ()=> render(filterList(searchEl.value)));
});