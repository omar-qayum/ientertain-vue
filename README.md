# iEntertain

**This website is **not** intended for commercial application. Its sole purpose is to demonstrate my technical skills.**

**Please contact me if you want a link to the live version!**

## Introduction

iEntertain is a **fictional** website where customers can purchase content from the following categories:
* Books
* Games
* Movies 
* Music

The business model operates on a monthly quota system which allows users to purchase a finite amount of content from the categories listed above. Users can select content from a pre-selected list of genres or perform a dynamic search for particular content. Depending on the content's category, various essential data is displayed to the user, via a modal, which can include trailers, for games and movies, and sample tracks for music.

## Technical Details

The website is built as a SPA using Vue 3's Composition API and Google's Firebase API for its frontend and backend, respectively.

### APIs
All category data has been sourced from the following free APIs:
* <a href="https://developers.google.com/books/docs/overview" target="_blank">Google Books</a>
* <a href="https://api-docs.igdb.com/#about" target="_blank">IGDB</a>
* <a href="https://developers.themoviedb.org/3/getting-started/regions" target="_blank">TMDB</a>
* <a href="https://developer.spotify.com/documentation/web-api/quick-start" target="_blank">Spotify</a>

### Dependencies
The following dependencies are used in this website:
* Axios
* Express
* Firebase (Auth, Firestore, Functions, Storage, Hosting)
* Font Awesome
* GSAP
* Pinia
* SASS
* Vite
* Vue
* Vue Router

### Responsiveness
The website is responsive in design for screen resolutions ranging from an iPhone 5 to FHD.

## Notes
For security reasons, the backend code has not been included in this repository.