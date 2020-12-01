$(document).ready(()=>{
   $("#searchForm").on("submit", (e)=>{
       e.preventDefault()
      // console.log(`submited ${$("#searchText").val()}`)
       let searchText = $("#searchText").val()
      getMovies(searchText)
      
  })
})

function getMovies(searchText, page=1){
    //console.log(`Gonna search for movies that include "${searchText}" in their title`)
    axios.get(`http://www.omdbapi.com/?apikey=f6e1b5fb&s=${searchText}&page=${page}`).then((res)=>{
console.log(res)
let movies = res.data.Search;
let totalResults = res.data.totalResults
//movies.map((m) => console.log(m.Title))
console.log(`Found ${totalResults} results!!!`)
let output ='';
$.each(movies, (index, movie)=>{
    output += `
    <div class='col-md-6'>
      <div class='well text-center'>
      <img src="${movie.Poster}">
         <h5>${movie.Title}</h5>
       <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie details</a>
       
      </div>
    </div>
    `
})
$('#movies').html(output)


let pages = ""

var i;
for (i = 1; i <= 10; i++) {
pages += 
`<a onclick="pageSelected('${searchText}', ${i})"  class="btn btn-primary m-1">${i}</a>`
}
pages += `<button id="next-button" type="submit" class="btn btn-primary m-3">Next >></button>`

 $('#pages').html(pages)

//$('#next-button').attr('style','display: inline')
  }).catch((err)=>{console.log(err)})
}

function pageSelected(searchText, page){
  getMovies(searchText, page)
  let currentPage= page
  console.log(`you are on page ${page} of found results!`)
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
let movie = res.data
let output = `
<div class="row">
 <div class="col-md-4">
  <img src="${movie.Poster}" class="thumbnail">
 </div>
 <div class="col-md-8">
  <h2>${movie.Title}</h2>
  <ul class="list-group">
   <li class="list-group-item><strong>Genre:</strong> ${movie.Genre}</li>
   <li class="list-group-item><strong>Released:</strong> ${movie.Released}</li>
   <li class="list-group-item><strong>IMDb Rating:</strong> ${movie.imdbRating}</li>
   <li class="list-group-item><strong>Directed by:</strong> ${movie.Director}</li>
   <li class="list-group-item><strong>Written by:</strong> ${movie.Writer}</li>
   <li class="list-group-item><strong>Starring:</strong> ${movie.Actors}</li>
   <li class="list-group-item><strong>Genre:</strong> ${movie.Genre}</li>
  </ul>
 </div>
</div>
<div class="row">
 <div class="well">
 <h3>Plot</h3>
 ${movie.PLot}
 <hr>
 <a href="https://www.imdb.com/title/${movie.imdbID}" target="blank" class="btn btn-primary">View IMDb page</a>
 <a href="index.html" class="btn btn-default">Back to Search</a>
`
$('#movie').html(output)
    }).catch((err)=>{console.log(err)})

}
