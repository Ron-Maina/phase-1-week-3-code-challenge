//Render first movie
fetch('http://localhost:3000/films')
.then(res => res.json())
.then(filmData => {
    let movie = document.createElement('div')
    movie.className='movie'
    movie.innerHTML =`
    <img src="${filmData[0].poster}">
    <h4>${filmData[0].title}</h4>
    <p>Showtime: ${filmData[0].showtime}</p>
    <p>Runtime: ${filmData[0].runtime}</p>
    <P>Available tickets: ${filmData[0].tickets_sold}</p>
    `
    console.log(movie)
    let main = document.querySelector('main')
    main.querySelector('#selected-movie').appendChild(movie)

})

// function renderFirstMovie(filmData){
    
//     let movie = document.createElement('div')
//     movie.className='movie'
//     movie.innerHtml = `
//     <img src="${filmData[0].poster}"
//     <h4>${filmData[0].title}</h4>
//     <p>Showtime: ${filmData[0].showtime}</p>
//     <p>Runtime: ${filmData[0].runtime}</p>
//     <P>Available tickets: ${filmData[0].tickets_sold}</p>
//     `
//     console.log(movie)
//     let main = document.querySelector('main')
//     main.querySelector('#selected-movie').appendChild(movie)
// }

