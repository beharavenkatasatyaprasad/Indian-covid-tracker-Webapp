const statesEl = document.getElementById('states');
const toggleBtn = document.getElementById('toggle');
const searchEl = document.getElementById('search');
const modal = document.getElementById('modal');
const closeBtn = document.getElementById('close');

getStates();

async function getStates() {
	const res = await fetch('https://api.covid19india.org/data.json');
    const response = await res.json();
    const states = response.statewise;
    console.log(states);
	displayStates(states);
}


function displayStates(states) {
	statesEl.innerHTML = '';

	states.forEach(country => {
		const stateEl = document.createElement('div');
		stateEl.classList.add('card');
		stateEl.innerHTML = `
            <div class="card-body">
                <h3 class="state-name">
                    ${country.state}
                </h3>
                <p>
                    <strong>last updated time:</strong>
                    ${country.lastupdatedtime}
                </p>
                <p>
                    <strong>Active:</strong>
                    ${country.active}
                </p>
                <p>
                    <strong>Confirmed:</strong>
                    ${country.confirmed}
                </p>
                <p>
                    <strong>Recovered:</strong>
                    ${country.recovered}
                </p>
                <p>
                    <strong>Deaths:</strong>
                    ${country.deaths}
                </p>
                <p><small>tap for more info</small></p>
            </div>
        `;

		stateEl.addEventListener('click', () => {
			modal.style.display = 'flex';
			showStateDetails(country);
		});

		statesEl.appendChild(stateEl);
	});
}

function showStateDetails(country) {
	const modalBody = modal.querySelector('.modal-body');

	modalBody.innerHTML = `
        <h2>${country.state}</h2>
        <p>
             <strong>Total Confirmed Cases:</strong>
             ${country.confirmed}
        </p>
        <p>
            <strong>Active Cases:</strong>
            ${country.active}
        </p>
        <p>
            <strong>Newly Confirmed Cases:</strong>
            ${country.deltaconfirmed}
        </p>
        <p>
            <strong>Newly Recovered:</strong>
            ${country.deltarecovered}
        </p>
        <p>
            <strong>Newly Registered Deaths:</strong>
            ${country.deltadeaths}
        </p>
        <p>
            <strong>press note:</strong>
            ${country.statenotes}
        </p>
    `;
}

// theme - dark & light
toggleBtn.addEventListener('click', () => {
	document.body.classList.toggle('dark');
});


// close the modal
closeBtn.addEventListener('click', () => {
	modal.style.display = 'none';
});

searchEl.addEventListener('input', e => {
	const { value } = e.target;
	const stateName = document.querySelectorAll('.state-name');

	stateName.forEach(name => {
		if (name.innerText.toLowerCase().includes(value.toLowerCase())) {
			// .card -> .card-body -> .state-name
			name.parentElement.parentElement.style.display = 'block';
		} else {
			name.parentElement.parentElement.style.display = 'none';
		}
	});
});



// scroll button function
var mybutton = document.getElementById("scrollBtn");
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } 
  else {
    mybutton.style.display = "none";
  }
}

function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }