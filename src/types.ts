import { Movie } from "./movieTypes"

export type ChildrenProp = {
  children: React.ReactElement
}

export type MovieContextTypes = {
  movies: Movie[],
  addMovie: (newMovie: Movie) => void,
  editMovie: (id: Movie["id"], editedMovie: Partial<Movie>) => void,
  deleteMovie: (id: Movie["id"]) => void,
  findMovie: (id: Movie["id"]) => Movie | string
}