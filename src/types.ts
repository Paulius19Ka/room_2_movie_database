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

export type User = {
  id: string,
  username: string,
  email: string,
  password: string,
  passwordText: string,
  dob: string,
  profilePicture: string,
  role: "admin" | "user",
  watchlistItems: string[]
};

export type UsersReducerActionTypes =
  { type: 'setData', data: User[] } |
  { type: 'addUser', newUser: User } |
  { type: 'addToWatchlist', movieId: Movie["id"], userId: User['id'] }

export type UsersContextTypes = {
  users: User[],
  loggedInUser: User | null,
  setLoggedInUser: React.Dispatch<React.SetStateAction<User | null>>,
  dispatch: React.Dispatch<UsersReducerActionTypes>
};

export type ThemeContextTypes = {
  theme: string,
  themeToggle: () => void
}