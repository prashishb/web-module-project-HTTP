import React, { useEffect, useState } from 'react';

import { Route, Switch, Redirect } from 'react-router-dom';
import MovieList from './components/MovieList';
import Movie from './components/Movie';

import MovieHeader from './components/MovieHeader';

import EditMovieForm from './components/EditMovieForm';
import FavoriteMovieList from './components/FavoriteMovieList';

import axios from 'axios';
import AddMovieForm from './components/AddMovieForm';

const App = (props) => {
  const [movies, setMovies] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/movies')
      .then((res) => {
        setMovies(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const deleteMovie = (id) => {
    setMovies(movies.filter((movie) => movie.id !== id));
  };

  const addToFavorites = (movie) => {
    if (!favoriteMovies.find((favMovie) => favMovie.id === movie.id)) {
      setFavoriteMovies([...favoriteMovies, movie]);
    }
  };

  const removeFromFavorites = (movie) => {
    setFavoriteMovies(
      favoriteMovies.filter((favMovie) => favMovie.id !== movie.id)
    );
  };

  return (
    <div>
      <nav className='navbar navbar-dark bg-dark'>
        <span className='navbar-brand'>
          <img width='40px' alt='' src='./Lambda-Logo-Red.png' /> HTTP / CRUD
          Module Project
        </span>
      </nav>

      <div className='container'>
        <MovieHeader />
        <div className='row '>
          <FavoriteMovieList favoriteMovies={favoriteMovies} />

          <Switch>
            <Route path='/movies/add'>
              <AddMovieForm setMovies={setMovies} />
            </Route>
            <Route path='/movies/edit/:id'>
              <EditMovieForm setMovies={setMovies} />
            </Route>

            <Route path='/movies/:id'>
              <Movie
                {...props}
                deleteMovie={deleteMovie}
                addToFavorites={addToFavorites}
                favoriteMovies={favoriteMovies}
                removeFromFavorites={removeFromFavorites}
              />
            </Route>

            <Route path='/movies'>
              <MovieList movies={movies} />
            </Route>

            <Route path='/'>
              <Redirect to='/movies' />
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default App;
