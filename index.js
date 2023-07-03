document.addEventListener('DOMContentLoaded', () => {
    //Render first movie
    function fetchFilms(){
        fetch('http://localhost:3000/films')
        .then(res => res.json())
        .then(filmData =>renderFirstMovie(filmData[0]))
    }
    fetchFilms()

    //Render first movie details to DOM
    function renderFirstMovie(filmData){
        let availableTickets = (filmData.capacity - filmData.tickets_sold)
        let movie = document.createElement('div')
        movie.className='movie'
        movie.innerHTML =`
        <img src="${filmData.poster}">
        <h4>${filmData.title}</h4>
        <p>Showtime: ${filmData.showtime}</p>
        <p>Runtime: ${filmData.runtime}</p>
        <P class="tickets">Available Tickets: ${availableTickets}</p>
        <button class="btn">Buy Ticket</button>`
        
        document.querySelector('#selected-movie').appendChild(movie)

        //Buy ticket for first movie
        document.querySelector('.btn').addEventListener('click', () => {
            if (availableTickets > 0){
                availableTickets-- 
            }
            else if(availableTickets === 0){
                document.querySelector('.btn').innerText = "Sold Out" 
            }
            document.querySelector('.tickets').textContent = `Available Tickets: ${availableTickets}`    
            
        })
        
    }
    
    //Fetch movies for movie menu
    fetch('http://localhost:3000/films')
    .then(res => res.json())
    .then(films => films.forEach(film => renderAllFilms(film)))

    //Render movies to movie menu
    function renderAllFilms(film){
        let movieList = document.createElement('li')
        movieList.className = 'film-item'
        movieList.innerHTML = `
        <img src = "${film.poster}">
        <h4>${film.title}</h4>
        <hr>
        `
        document.querySelector('#films').appendChild(movieList)

        //Render full details for selected movie
        movieList.querySelector('h4').addEventListener('click', () => {
            let availableTickets = (film.capacity - film.tickets_sold)
            document.querySelector('#selected-movie').innerHTML=''
            let selectedMovie = document.createElement('div')
            selectedMovie.className='movie'
            selectedMovie.innerHTML=`
            <img src = "${film.poster}">
            <h4>${film.title}</h4>
            <p>Showtime: ${film.showtime}</p>
            <p>Runtime: ${film.runtime}</p>
            <p class="tickets">Available Tickets: ${availableTickets}</p>
            <button class="btn">Buy Ticket</button>`
            document.querySelector('#selected-movie').appendChild(selectedMovie)

            //Buy ticket for selected movie
            document.querySelector('.btn').addEventListener('click', () => {
                if (availableTickets > 0){
                    availableTickets--
                    film.tickets_sold = (film.capacity - availableTickets)
                }
                else if(availableTickets === 0){
                    document.querySelector('.btn').innerText = "Sold Out"
                    let soldOut = document.createElement('li')
                    soldOut.className = "sold-out"
                    soldOut.innerHTML = `
                    <img src = "${film.poster}">
                    <h4>${film.title}</h4>
                    <hr>`
                    movieList.replaceWith(soldOut) 
                }
                document.querySelector('.tickets').textContent = `Available Tickets: ${availableTickets}`
                
                
            })     
        })    
    }


})


