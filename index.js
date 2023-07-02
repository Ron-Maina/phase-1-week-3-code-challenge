document.addEventListener('DOMContentLoaded', () => {
    //Render first movie
    function fetchFilms(){
        fetch('http://localhost:3000/films')
        .then(res => res.json())
        .then(filmData =>renderFirstMovie(filmData))
    }
    fetchFilms()

        function renderFirstMovie(filmData){
            let availableTickets = (filmData[0].capacity - filmData[0].tickets_sold)
            let movie = document.createElement('div')
            movie.className='movie'
            movie.innerHTML =`
            <img src="${filmData[0].poster}">
            <h4>${filmData[0].title}</h4>
            <p>Showtime: ${filmData[0].showtime}</p>
            <p>Runtime: ${filmData[0].runtime}</p>
            <P class="tickets">Available Tickets: ${availableTickets}</p>
            <button class="btn">Buy Ticket</button>`
            
            let main = document.querySelector('main')
            main.querySelector('#selected-movie').appendChild(movie)

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
    
     
    

    //display movie menu
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

        //Displaying selected movie
        console.log(movieList.querySelector('h4'))
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
            <button class="btn">Buy Ticket</button>
            `
            let main = document.querySelector('main')
            main.querySelector('#selected-movie').appendChild(selectedMovie)

            //Buy ticket event listener
            document.querySelector('.btn').addEventListener('click', () => {
                if (availableTickets > 0){
                    availableTickets--
                }
                else if(availableTickets === 0){
                    document.querySelector('.btn').innerText = "Sold Out"  
                }
                document.querySelector('.tickets').textContent = `Available Tickets: ${availableTickets}`    
                
            })     
        })    
    }



   





})



