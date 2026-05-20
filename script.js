const API_URL="https://www.omdbapi.com/?i=tt3896198&apikey=84b49b42";


async function fetchMovies(query){
    try{
    const response=await fetch(`${API_URL}&s=${query}`);
    const data=await response.json();
   if(data.Response==='True'){
    console.log("print movie data",data.Search);
   }else{
    console.log(`No movies found for query:${query}`)
   }

}catch(error){
    console.error(`Error fetching movies: ${error}`);
}

}
const searchQuery="rose"
fetchMovies(searchQuery);