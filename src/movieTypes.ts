export type UserRating = {
  score: number, // 7.5
  votes: number
}

export type IMDBInfo = {
  totalScore: number, // integer number 1-10
  userRatings: UserRating[]
}

export type PopularityType = {
  ranking: number,
  weeklyChange: number
}

export type VideosType = {
  trailers: string[], // array of links
  cutscenes: string[] // array of links
}

export type PhotosType = {
  poster: string[], // array of links
  cutscenes: string[], // array of links
  videos: VideosType
}

export type GenresType = [ // need to fix this !!!
  | 'Select a genre'
  | 'Action'
  | 'Adventure'
  | 'Animation'
  | 'Biography'
  | 'Comedy'
  | 'Crime'
  | 'Documentary'
  | 'Drama'
  | 'Family'
  | 'Fantasy'
  | 'History'
  | 'Horror'
  | 'Musical'
  | 'Mystery'
  | 'Romance'
  | 'Sci-Fi'
  | 'Sports'
  | 'Thriller'
  | 'War'
  | 'Western'
];

export type Writer = {
  name: string, 
  role: string
}

export type Actor = {
  name: string,
  character: string[], // Scott Lang, Ant-Man
  actorPhoto: string
}

export type CastType = {
  director: string,
  writers: Writer[]
}

export type ReviewsType = {
  users?: number,
  critics?: number,
  metascore: number // integer number 1-100
}

export type AgeRating = 
  | 'Select an age Rating'
  | 'G'
  | 'PG'
  | 'PG-13'
  | 'R'
  | 'NC-17'

export type Movie = {
  id: string,
  title: string,
  releaseYear: number,
  eirinCategory: AgeRating, // PG
  length: number, // minutes
  IMDB?: IMDBInfo,
  popularity?: PopularityType,
  photos: PhotosType,
  videos: VideosType,
  genres: GenresType,
  description: string,
  castAndCrew: CastType,
  actors: Actor[],
  reviews: ReviewsType
}