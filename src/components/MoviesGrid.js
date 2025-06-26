import React, { useState, useEffect, Fragment } from 'react';
import '../styles.css'
import MoviesCard from './MovieCard';

export default function MoviesGrid () {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [genre, setGenre] = useState('All Genres');
    const [rating, setRating] = useState('Any Rating');

    useEffect (() => {
        fetch("movies.json")
        .then(response => response.json())
        .then(data => setMovies(data))
    }, [])

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value)
    }

    const handleGenreChange = (e) => {
        setGenre(e.target.value)
    }
    
    const handleRatingChange = (e) => {
        setRating(e.target.value)
    }    

    const matchesGenre = (movie, genre) => {
        return genre === 'All Genres' || movie.genre.toLowerCase() === genre.toLowerCase();
    }
    
    const matchesRating = (movie, rating) => {
        switch(rating) {
            case 'Any Rating':
                return true;
            
            case 'Good':
                return movie.rating >= 8
            case 'Ok':
                return movie.rating >= 5 && movie.rating <8
            case 'Bad':
                return movie.rating < 5
            default:
                return false;
        }
    }

    const matchesFilter = (movie, searchTerm) => {
        return  movie.title.toLowerCase().includes(searchTerm.toLowerCase());
    }

    const filteredMovies = movies.filter(movie => 
       matchesGenre(movie, genre) && matchesFilter(movie, searchTerm) && matchesRating(movie, rating)
    );


    return (
        <Fragment>
            <div>
                <input type='text' placeholder='Search movies...'  className='search-input' value={searchTerm} onChange={handleSearchChange}/>
                <div className='filter-bar'>
                    <div className='filter-slot'>
                        <label>Genre</label>
                        <select className='filter-dropdown' value={genre} onChange={handleGenreChange}>
                            <option>All Genres</option>
                            <option>Action</option>
                            <option>Drama</option>
                            <option>Fantasy</option>
                            <option>Horror</option>
                        </select>    
                    </div>
                    <div className='filter-slot'>
                        <label>Rating</label>
                        <select className='filter-dropdown' value={rating} onChange={handleRatingChange}>
                            <option>Any Rating</option>
                            <option>Good</option>
                            <option>Ok</option>
                            <option>Bad</option>
                        </select>
                    </div>                    
                </div>
                <div className='movies-grid'>
                    {
                        filteredMovies.map(movie => (
                            <MoviesCard movie={movie} />
                        ))
                    }
                </div>
            </div>
        </Fragment>
    );

}