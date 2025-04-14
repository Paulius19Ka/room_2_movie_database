import { createContext, useEffect, useReducer } from "react";

import { Movie } from "../movieTypes";
import { ChildrenProp, MovieContextTypes } from "../types";

type ActionTypes = 
{ type: 'setData', data: Movie[] } |
{ type: 'addMovie', newMovie: Movie } |
{ type: 'editMovie', id: Movie['id'], editedMovie: Partial<Movie>} |
{ type: 'deleteMovie', id: Movie['id'] }
// things to add - user ratings functionality

const reducer = (state: Movie[], action: ActionTypes) => {
  switch(action.type){
    case 'setData':
      return action.data;
    case 'addMovie':
      return [...state, action.newMovie];
    case 'editMovie':
      return state.map(movie => {
        if(movie.id === action.id){
          return {
            ...movie,
            ...action.editedMovie
          };
        } else {
          return movie;
        }
      });
    case 'deleteMovie':
      return state.filter(movie => movie.id !== action.id);
    default:
      console.error('There was an error :(');
      return state;
  }
}

const MoviesContext = createContext<MovieContextTypes | undefined>(undefined);
const MoviesProvider = ({ children }: ChildrenProp) => {

  const [movies, dispatch] = useReducer(reducer, []);

  const addMovie = (newMovie: Movie) => {
    fetch(`http://localhost:8080/movies`, {
      method: "POST",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify(newMovie)
    });
    dispatch({
      type: "addMovie",
      newMovie
    });
  }

  const editMovie = (id: Movie['id'], editedMovie: Partial<Movie>) => {
    fetch(`http://localhost:8080/movies/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify(editedMovie)
    });
    dispatch({
      type: 'editMovie',
      id,
      editedMovie
    });
  };

  const deleteMovie = (id: Movie['id']) => {
    fetch(`http://localhost:8080/movies/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type":"application/json"
      }
    });
    dispatch({
      type: 'deleteMovie',
      id
    });
  };

  const findMovie = (id: Movie['id']): Movie | string => {
    const foundMovie = movies.find( movie => movie.id === id);
    if(foundMovie){
      return foundMovie;
    } else {
      return 'Error: Movie not found';
    }
  }

  useEffect(() => {
    fetch(`http://localhost:8080/movies`)
      .then(res => res.json())
      .then((data: Movie[]) => dispatch({
        type: "setData",
        data
      }));
  }, []);

  return (
    <MoviesContext.Provider
      value={{
        movies,
        addMovie,
        editMovie,
        deleteMovie,
        findMovie
      }}
    >
      { children }
    </MoviesContext.Provider>
  )
}

export { MoviesProvider };
export default MoviesContext;