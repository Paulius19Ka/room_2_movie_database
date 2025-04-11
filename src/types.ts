import { Movie } from "./movieTypes"

export type ChildrenProp = {
  children: React.ReactElement
}

export type MovieContextTypes = {
  movies: Movie[],
  addMovie: (newMovie: Movie) => void
}