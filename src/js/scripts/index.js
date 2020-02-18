import selectOnlyThisCheckbox from '../utils/selectOnlyThisCheckbox';
import selectedMovieTL from '../animations/selectedMovieTL';

// ----------------------------------------------

const seatsWrapper = document.querySelector('.movie__wrapper'),
  seats = document.querySelectorAll('.seat:not(.reserved)'),
  count = document.querySelector('#count'),
  total = document.querySelector('#total'),
  checkboxes = document.querySelectorAll('.movie__checkbox');

let ticketPrice = 0,
  selectedSeatsCount = 0;

// ----------------------------------------------

// Update total and count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.movie__seat.selected');
  selectedSeatsCount = selectedSeats.length;
  count.textContent = selectedSeatsCount;
  total.textContent = selectedSeatsCount * ticketPrice;
}

// ----------------------------------------------

checkboxes.forEach(checkbox => {
  checkbox.addEventListener('click', e => {
    selectOnlyThisCheckbox(e.target, '.movie__checkbox');
    ticketPrice = +e.target.value;
    const movieName = e.target.id,
      totalPrice = selectedSeatsCount * ticketPrice;

    selectedMovieTL(movieName, ticketPrice, totalPrice);
  });
});

// ----------------------------------------------

seatsWrapper.addEventListener('click', e => {
  if (
    e.target.classList.contains('movie__seat') &&
    !e.target.classList.contains('reserved')
  ) {
    e.target.classList.toggle('selected');
    updateSelectedCount();
  }
});
