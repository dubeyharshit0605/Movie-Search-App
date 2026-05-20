const API_URL="https://www.omdbapi.com/?i=tt3896198&apikey=84b49b42";
const searchInput=document.getElementById('searchInput');
const searchBtn=document.getElementById("searchBtn");
const movieResults=document.getElementById('movieResults');

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
        `;

        movieResults.appendChild(movieCard);
    });
}

 searchBtn.addEventListener('click',()=>{
     const query=searchInput.value.trim();
      if(query){
         fetchMovies(query);
      }
 })