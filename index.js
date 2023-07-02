document.addEventListener('DOMContentLoaded', () => {
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
        <P>Available tickets: ${filmData[0].capacity - filmData[0].tickets_sold}</p>
        <button class="btn">Buy Ticket</button>
        `
        console.log(movie)
        let main = document.querySelector('main')
        main.querySelector('#selected-movie').appendChild(movie)
    })

    //display the rest of the movies
    fetch('http://localhost:3000/films')
    .then(res => res.json())
    .then(films => films.forEach(film => renderAllFilms(film)))

    //function to handle rendering the rest of the films
    function renderAllFilms(film){
        let movieList = document.createElement('li')
        movieList.className = 'film-item'
        movieList.innerHTML = `
        <img src = "${film.poster}">
        <h4>${film.title}</h4>
        `
        let main = document.querySelector('main')
        main.querySelector('#films').appendChild(movieList)

        //add event listener to movie titles
        console.log(movieList.querySelector('h4'))
        movieList.querySelector('h4').addEventListener('click', () => {
            // function displaySelectedMovie(){
            document.querySelector('#selected-movie').innerHTML=''
            let selectedMovie = document.createElement('div')
            selectedMovie.className='movie'
            selectedMovie.innerHTML=`
            <img src = "${film.poster}">
            <h4>${film.title}</h4>
            <p>Showtime: ${film.showtime}</p>
            <p>Runtime: ${film.runtime}</p>
            <p>Available Tickets: ${film.capacity - film.tickets_sold}</p>
            <button class="btn">Buy Ticket</button>
            `
            let main = document.querySelector('main')
            main.querySelector('#selected-movie').appendChild(selectedMovie)
        })

      
        
    }






})



