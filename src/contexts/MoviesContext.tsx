import { createContext, useEffect, useReducer } from "react";

import { Movie } from "../movieTypes";
import { ChildrenProp, MovieContextTypes } from "../types";

type ActionTypes = 
{ type: 'setData', data: Movie[] }

const reducer = (state: Movie[], action: ActionTypes) => {
  switch(action.type){
    case 'setData':
      return action.data;
    default:
      console.error('There was an error :(');
      return state;
  }
}

const MoviesContext = createContext<MovieContextTypes | undefined>(undefined);
const MoviesProvider = ({ children }: ChildrenProp) => {

  const [movies, dispatch] = useReducer(reducer, []);

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
        movies
      }}
    >
      { children }
    </MoviesContext.Provider>
  )
}

export { MoviesProvider };
export default MoviesContext;