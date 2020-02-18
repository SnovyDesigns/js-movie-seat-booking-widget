import selectOnlyThisCheckbox from '../utils/selectOnlyThisCheckbox';
import selectedMovieTL from '../animations/selectedMovieTL';

// ----------------------------------------------

const seats = document.querySelectorAll('.seat:not(.reserved)'),
  count = document.querySelector('#count'),
  total = document.querySelector('#total'),
  checkboxes = document.querySelectorAll('.movie__checkbox');

// ----------------------------------------------

checkboxes.forEach(checkbox => {
  checkbox.addEventListener('click', e => {
    selectOnlyThisCheckbox(e.target, '.movie__checkbox');
    const movieName = e.target.id,
      ticketPrice = e.target.value;
    selectedMovieTL(movieName, ticketPrice);
  });
});

// ----------------------------------------------
