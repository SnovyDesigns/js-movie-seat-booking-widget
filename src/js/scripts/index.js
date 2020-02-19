import selectOnlyThisCheckbox from '../utils/selectOnlyThisCheckbox';
import selectedMovieTL from '../animations/selectedMovieTL';

// ----------------------------------------------

const seatsWrapper = document.querySelector('.movie__wrapper'),
  seats = document.querySelectorAll('.movie__seat:not(.reserved)'),
  price = document.querySelector('#price'),
  count = document.querySelector('#count'),
  total = document.querySelector('#total'),
  checkboxes = document.querySelectorAll('.movie__checkbox');

let ticketPrice = 10,
  selectedSeatsCount = 0;

populateUI();

// ----------------------------------------------

// Update total and count
function updateSelectedCountAndTotal() {
  const selectedSeats = document.querySelectorAll('.movie__seat.selected');
  selectedSeatsCount = selectedSeats.length;
  const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));
  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  count.textContent = selectedSeatsCount;
  total.textContent = selectedSeatsCount * ticketPrice;
}

// Set selected movie data to LS
function setMovieData(movieName, ticketPrice) {
  localStorage.setItem('selectedMovieName', movieName);
  localStorage.setItem('selectedMoviePrice', ticketPrice);
}

// Get data from LS and populate UI
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats')),
    selectedMovieName = localStorage.getItem('selectedMovieName'),
    selectedMoviePrice = localStorage.getItem('selectedMoviePrice');

  if (selectedMovieName !== null && selectedMoviePrice !== null) {
    selectOnlyThisCheckbox(
      document.getElementById(selectedMovieName),
      '.movie__checkbox'
    );
    price.textContent = selectedMoviePrice;
    ticketPrice = selectedMoviePrice;
  }

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.includes(index)) {
        seat.classList.add('selected');
      }
    });
  }
}

// ----------------------------------------------

checkboxes.forEach(checkbox => {
  checkbox.addEventListener('click', e => {
    selectOnlyThisCheckbox(e.target, '.movie__checkbox');
    ticketPrice = +e.target.value;
    const movieName = e.target.id,
      totalPrice = selectedSeatsCount * ticketPrice;

    selectedMovieTL(movieName, ticketPrice, totalPrice);
    setMovieData(movieName, ticketPrice);
  });
});

// ----------------------------------------------

seatsWrapper.addEventListener('click', e => {
  if (
    e.target.classList.contains('movie__seat') &&
    !e.target.classList.contains('reserved')
  ) {
    e.target.classList.toggle('selected');
    updateSelectedCountAndTotal();
  }
});

updateSelectedCountAndTotal();
