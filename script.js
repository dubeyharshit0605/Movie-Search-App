const API_URL="https://www.omdbapi.com/?i=tt3896198&apikey=84b49b42";
const searchInput=document.getElementById('searchInput');
const searchBtn=document.getElementById("searchBtn");
const movieResults=document.getElementById('movieResults');
const favorites=document.getElementById('favorites');
const favoriteMovies=JSON.parse(localStorage.getItem('favorite'))||[];
document.addEventListener('DOMContentLoaded',displayFavorites);
async function fetchMovies(query){
    try{
    const response=await fetch(`${API_URL}&s=${query}`);
    const data=await response.json();
   if(data.Response==='True'){
    //console.log("print movie data",data.Search);
     displayMovies(data.Search);
   }else{
    console.log(`No movies found for query:${query}`)
   }

}catch(error){
    console.error(`Error fetching movies: ${error}`);
}

}
function displayMovies(movies) {
    movieResults.innerHTML='';
    movies.forEach((movie) => {
        const movieCard = document.createElement('div');

        movieCard.innerHTML = `
            <img src="${movie.Poster}" alt="${movie.Title}">
            <h3>${movie.Title}</h3>
            <p>${movie.Year}</p>
            <button onclick="addtofavorites('${movie.imdbID}','${movie.Title.replace("'","\\"+"'")}','${movie.Poster}','${movie.Year}');">Add to favorites</button>

        `;

        movieResults.appendChild(movieCard);
    });
}
function addtofavorites(id ,title,poster,year) {
    if(favoriteMovies.some(movie=>movie.id===id)){
        return;}
    favoriteMovies.push({id,title,poster,year});
    localStorage.setItem('favorite',JSON.stringify(favoriteMovies));
    displayFavorites();
}
function displayFavorites() {
     favorites.innerHTML='';
    favoriteMovies.forEach((movie) => {
        const movieCard = document.createElement('div');

        movieCard.innerHTML = `
            <img src="${movie.poster}" alt="${movie.title}">
            <h3>${movie.title}</h3>
            <p>${movie.year}</p>
          <button>Remove</button>

        `;

        favorites.appendChild(movieCard);
    });
}

 searchBtn.addEventListener('click',()=>{
     const query=searchInput.value.trim();
      if(query){
         fetchMovies(query);
      }
 })