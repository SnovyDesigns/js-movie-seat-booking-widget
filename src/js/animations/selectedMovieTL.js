import gsap from 'gsap';
import TextPlugin from 'gsap/TextPlugin';
import movieData from '../data/movieData';

// ----------------------------------------------

// Register GSAP plugin
gsap.registerPlugin(TextPlugin);

// ----------------------------------------------

export default function selectedMovieTL(movieName, ticketPrice) {
  const tl = gsap.timeline(),
    movieBGS = document.querySelectorAll('.movie__bg'),
    moviePosters = document.querySelectorAll('.movie__poster'),
    selectedMovieBG = document.querySelector(`#${movieName}-bg`),
    selectedMoviePoster = document.querySelector(`#${movieName}-poster`),
    price = document.querySelector('#price'),
    director = document.querySelector('#director'),
    starring = document.querySelector('#starring'),
    genre = document.querySelector('#genre'),
    { directorText, starringText, genreText } = movieData[movieName];

  tl.to(
    [movieBGS, moviePosters],
    { duration: 1, opacity: 0, ease: 'power2.in' },
    0
  )
    .to(
      [selectedMovieBG, selectedMoviePoster],
      { duration: 1, opacity: 1, ease: 'power2.out' },
      0
    )
    .to(
      [director, starring, genre, price],
      { duration: 0.35, y: -20, opacity: 0, ease: 'power3', stagger: 0.1 },
      0.1
    )
    .set(director, { text: directorText }, 0.8)
    .set(starring, { text: starringText }, 0.8)
    .set(genre, { text: genreText }, 0.8)
    .set(price, { text: ticketPrice }, 0.8)
    .set([director, starring, genre, price], { y: 20 }, 0.8)
    .to(
      [director, starring, genre, price],
      {
        duration: 0.35,
        y: 0,
        opacity: 1,
        ease: 'power3',
        stagger: 0.1
      },
      0.85
    );

  return tl;
}
