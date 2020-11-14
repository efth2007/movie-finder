$(document).ready(()=>{
   $("#searchForm").on("submit", (e)=>{
       e.preventDefault()
      // console.log(`submited ${$("#searchText").val()}`)
       let searchText = $("#searchText").val()
       getMovies(searchText)
   })
})

function getMovies(searchText){
    //console.log(`Gonna search for movies that include "${searchText}" in their title`)
    axios.get(`http://www.omdbapi.com/?apikey=f6e1b5fb&s=${searchText}`).then((res)=>{
console.log(res)
let movies = res.data.search
    }).catch((err)=>{console.log(err)})
}