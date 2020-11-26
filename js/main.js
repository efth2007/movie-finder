$(document).ready(()=>{
   $("#searchForm").on("submit", (e)=>{
       e.preventDefault()
      // console.log(`submited ${$("#searchText").val()}`)
       let searchText = $("#searchText").val()
      getMovies(searchText)
  })
//getMovies("mother")
})

function getMovies(searchText){
    //console.log(`Gonna search for movies that include "${searchText}" in their title`)
    axios.get(`http://www.omdbapi.com/?apikey=f6e1b5fb&s=${searchText}`).then((res)=>{
console.log(res)
let movies = res.data.Search;
//movies.map((m) => console.log(m.Title))
let output ='';
$.each(movies, (index, movie)=>{
    output += `
    <div class='col-md-3'>
      <div class='well text-center'>
      <img src="${movie.Poster}">
         <h5>${movie.Title}</h5>
       <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie details</a>
       
      </div>
    </div>
    `
})
$('#movies').html(output)
    }).catch((err)=>{console.log(err)})
}

function movieSelected(id){
 // console.log(`The movie you selected: ${movie.imdbID}`)
  sessionStorage.setItem('movieId', id);
  window.location = './movie.html';
  return false
}

function getMovie(){
  let movieId =sessionStorage.getItem('movieId')

  axios.get(`http://www.omdbapi.com/?apikey=f6e1b5fb&i=${movieId}`).then((res)=>{
console.log(res)

    }).catch((err)=>{console.log(err)})

}
