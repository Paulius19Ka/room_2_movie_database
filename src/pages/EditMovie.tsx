import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Field, Formik, Form, ErrorMessage, FieldArray } from "formik";
import * as Yup from 'yup';

import MoviesContext from "../contexts/MoviesContext";
import { MovieContextTypes } from "../types";
import { AgeRating, Movie } from "../movieTypes";

const EditMovie = () => {

  type InitialValuesType = Movie;
  
  const movieRatings: AgeRating[] = [
    'Select an age Rating',
    'G',
    'PG',
    'PG-13',
    'R',
    'NC-17'
  ];
  
  const movieGenres = [
    'Action',
    'Adventure',
    'Animation',
    'Biography',
    'Comedy',
    'Crime',
    'Documentary',
    'Drama',
    'Family',
    'Fantasy',
    'History',
    'Horror',
    'Musical',
    'Mystery',
    'Romance',
    'Sci-Fi',
    'Sports',
    'Thriller',
    'War',
    'Western'
  ];

  const { id } = useParams();
  const { findMovie, editMovie } = useContext(MoviesContext) as MovieContextTypes;
  const [movie, setMovie] = useState<Movie | undefined>(undefined);
  const navigate = useNavigate();

  const initialValues: InitialValuesType = {
    id: '',
    title: movie ? movie.title : '',
    releaseYear: movie ? movie.releaseYear : 1900,
    eirinCategory: movie ? movie.eirinCategory : 'Select an age Rating',
    length: movie ? movie.length : 0,
    photos: {
      poster: movie ? movie.photos.poster : [],
      cutscenes: movie ? movie.photos.cutscenes : []
    },
    videos: {
      trailers: movie ? movie.videos.trailers : [],
      cutscenes: movie ? movie.videos.cutscenes : []
    },
    genres: movie ? movie.genres : [],
    description: movie ? movie.description : '',
    castAndCrew: {
      director: movie ? movie.castAndCrew.director : '',
      writers: movie ? movie.castAndCrew.writers : [],
      actors: movie ? movie.castAndCrew.actors : []
    },
    reviews: {
      metascore: movie ? movie.reviews.metascore : 0,
      critics: movie ? movie.reviews.critics : 0,
      users: movie ? movie.reviews.users : 0
    }
  };

  const validSchema = Yup.object({
      title: Yup.string()
        .min(5, 'Too short, <5')
        .max(30, 'Too long, >30')
        .required('Field is required')
        .trim(),
      releaseYear: Yup.number()
        .min(1900, 'Too old, <1900')
        .max(2040, 'Too distant, >2040')
        .required('Field is required'),
      eirinCategory: Yup.string()
        .notOneOf(['Select an age Rating'], 'Must select an age rating')
        .required('Field is required'),
      length: Yup.number()
        .min(1, 'Too short, <1')
        .max(500, 'Too long, >500')
        .required('Field is required'),
      photos: Yup.object({
        poster: Yup.array()
          .of(
            Yup.string()
              .url('Must be a valid url')
              .required('Field is required')
          )
          .min(1, 'Must have at least one poster')
          .required('Field is required'),
        cutscenes: Yup.array()
          .of(
            Yup.string()
              .url('Must be a valid url')
              .required('Field is required')
          )
          .min(1, 'Must have at least one cutscene image')
          .required('Field is required'),
      }),
      videos: Yup.object({
        trailers: Yup.array()
          .of(
            Yup.string()
              .url('Must be a valid url')
              .required('Field is required')
          )
          .min(1, 'Must have at least one trailer')
          .required('Field is required'),
        cutscenes: Yup.array()
          .of(
            Yup.string()
              .url('Must be a valid url')
              .required('Field is required')
          )
          .min(1, 'Must have at least one cutscene clip')
          .required('Field is required'),
      }),
      genres: Yup.array()
        .min(1, 'Must select at least one genre')
        .required('Field is required'),
      description: Yup.string()
        .min(10, 'Too short, <10')
        .max(1000, 'Too long, >1000')
        .required('Field is required')
        .trim(),
      castAndCrew: Yup.object({
        director: Yup.string()
          .min(5, 'Too short, <5')
          .max(30, 'Too long, >30')
          .required('Field is required')
          .trim(),
        writers: Yup.array()
          .of(
            Yup.object({
              name: Yup.string()
                .min(5, 'Too short, <5')
                .max(30, 'Too long, >30')
                .required('Field is required')
                .trim(),
              role: Yup.string()
                .min(5, 'Too short, <5')
                .max(30, 'Too long, >30')
                .required('Field is required')
                .trim(),
            })
          )
          .min(1, 'Must have at least one writer')
          .required('Field is required'),
        actors: Yup.array()
          .of(
            Yup.object({
              name: Yup.string()
                .min(5, 'Too short, <5')
                .max(30, 'Too long, >30')
                .required('Field is required')
                .trim(),
              character: Yup.array()
                .of(
                  Yup.string()
                    .min(5, 'Too short, <5')
                    .max(30, 'Too long, >30')
                    .required('Field is required')
                    .trim()
                )
                .min(1, 'Must have at least one role')
                .required('Field is required'),
              actorPhoto: Yup.string()
                .url('Must be a valid url')
                .required('Field is required'),
            })
          )
          .min(1, 'Must have at least one actor')
          .required('Field is required')
      }),
      reviews: Yup.object({
        metascore: Yup.number()
          .min(0, 'Too low, <0')
          .max(100, 'Too high, >100')
          .required('Field is required'),
        critics: Yup.number()
          .min(0, 'Too low, <0')
          .required('Field is required'),
        users: Yup.number()
          .min(0, 'Too low, <0')
          .required('Field is required'),
      })
    })
  
  useEffect(() => {
    if(id){
      const foundMovie = findMovie(id);
      if(foundMovie && typeof foundMovie === 'object'){
        setMovie(foundMovie);
      }
    }
    // console.log(movie);
  }, [id, findMovie, movie]);

  const submitHandler = (values: InitialValuesType) => {
    // console.log(values);
    if(id){
      editMovie(id, values)
      // navigate(`/${id}`);
      navigate(`/`);
    }
  };

  return (
    <section>
      {
        movie ?
        <div>
          <h2>Edit Movie</h2>
          <h3>{movie.title}</h3>
          <Formik 
            initialValues={initialValues}
            onSubmit={submitHandler}
            // validationSchema={validSchema}
          >
            <Form>
              <div>
                <label htmlFor="title">Title:</label>
                <Field
                  id='title' name='title'
                  placeholder='Movie title...'
                  type='text'
                />
                <ErrorMessage name='title' component='p' />
              </div>
              <div>
                <label htmlFor="releaseYear">Release Year:</label>
                <Field
                  id='releaseYear' name='releaseYear'
                  placeholder='Release year...'
                  type='number'
                />
                <ErrorMessage name='releaseYear' component='p' />
              </div>
              <div>
                <label htmlFor="eirinCategory">Age Rating:</label>
                <Field
                  as="select"
                  id='eirinCategory' name='eirinCategory'
                >
                  {
                    movieRatings.map((el, i) => 
                      <option value={el} key={i}>{el}</option>
                    )
                  }
                </Field>
                <ErrorMessage name='eirinCategory' component='p' />
              </div>
              <div>
                <label htmlFor="length">Length:</label>
                <Field
                  id='length' name='length'
                  placeholder='Lenth in minutes...'
                  type='number'
                />
                <ErrorMessage name='length' component='p' />
              </div>
              <div>
                <label htmlFor="photos.poster">Posters:</label>
                <FieldArray
                  name='photos.poster'
                  render={arrayHelpers => (
                    <>
                      {
                        arrayHelpers.form.values.photos.poster.map((_: string, i: number) => (
                          <div key={i}>
                            <Field
                              id={`photos.poster.${i}`} name={`photos.poster[${i}]`}
                              placeholder='Url of a picture...'
                              type='url'
                            />
                            <button type='button' onClick={() => arrayHelpers.remove(i)}>-</button>
                          </div>
                        ))
                      }
                      <button type='button' onClick={() => arrayHelpers.push('')}>+</button>
                    </>
                  )}
                />
                <ErrorMessage name='photos.poster' component='p' />
              </div>
              <div>
                <label htmlFor="photos.cutscenes">Cutscenes:</label>
                <FieldArray
                  name='photos.cutscenes'
                  render={arrayHelpers => (
                    <>
                      {
                        arrayHelpers.form.values.photos.cutscenes.map((_: string, i: number) => (
                          <div key={i}>
                            <Field
                              id={`photos.cutscenes.${i}`} name={`photos.cutscenes[${i}]`}
                              placeholder='Url of a picture...'
                              type='url'
                            />
                            <button type='button' onClick={() => arrayHelpers.remove(i)}>-</button>
                          </div>
                        ))
                      }
                      <button type='button' onClick={() => arrayHelpers.push('')}>+</button>
                    </>
                  )}
                />
                <ErrorMessage name='photos.cutscenes' component='p' />
              </div>
              <div>
                <label htmlFor="videos.trailers">Trailers:</label>
                <FieldArray
                  name='videos.trailers'
                  render={arrayHelpers => (
                    <>
                      {
                        arrayHelpers.form.values.videos.trailers.map((_: string, i: number) => (
                          <div key={i}>
                            <Field
                              id={`videos.trailers.${i}`} name={`videos.trailers[${i}]`}
                              placeholder='Url of a video...'
                              type='url'
                            />
                            <button type='button' onClick={() => arrayHelpers.remove(i)}>-</button>
                          </div>
                        ))
                      }
                      <button type='button' onClick={() => arrayHelpers.push('')}>+</button>
                    </>
                  )}
                />
                <ErrorMessage name='videos.trailers' component='p' />
              </div>
              <div>
                <label htmlFor="videos.cutscenes">Video Cutscenes:</label>
                <FieldArray
                  name='videos.cutscenes'
                  render={arrayHelpers => (
                    <>
                      {
                        arrayHelpers.form.values.videos.cutscenes.map((_: string, i: number) => (
                          <div key={i}>
                            <Field
                              id={`videos.cutscenes.${i}`} name={`videos.cutscenes[${i}]`}
                              placeholder='Url of a video...'
                              type='url'
                            />
                            <button type='button' onClick={() => arrayHelpers.remove(i)}>-</button>
                          </div>
                        ))
                      }
                      <button type='button' onClick={() => arrayHelpers.push('')}>+</button>
                    </>
                  )}
                />
                <ErrorMessage name='videos.cutscenes' component='p' />
              </div>
              {/* checkbox for genres */}
              <div>
                <label htmlFor="genres">Genres:</label>
                {
                  movieGenres ?
                  movieGenres.map((genre, i) => 
                    <div key={i}>
                      <Field
                        type='checkbox'
                        name='genres' id={genre}
                        value={genre}
                        // checked={movie.genres.includes(genre)}
                      />
                      <label htmlFor={genre}>{genre}</label>
                    </div>
                  ) :
                  <p>Loading...</p>
                }
                <ErrorMessage name='genres' component='p' />
              </div>
              {/* description textarea */}
              <div>
                <label htmlFor="description">Description:</label>
                <Field
                  as='textarea'
                  name='description'
                  placeholder='Enter a descrioption...'
                />
                <ErrorMessage name="description" component="p" />
              </div>
              {/* crew input fields */}
              <div>
                <label htmlFor="castAndCrew.director">Director:</label>
                <Field
                  id='castAndCrew.director' name='castAndCrew.director'
                  placeholder='Name of the director...'
                  type='text'
                />
                <ErrorMessage name='castAndCrew.director' component='p' />
              </div>
              <div>
                <label htmlFor="castAndCrew.writers">Writers:</label>
                <FieldArray
                  name='castAndCrew.writers'
                  render={arrayHelpers => (
                    <>
                      {
                        arrayHelpers.form.values.castAndCrew.writers.map((_: string, i: number) => (
                          <div key={i}>
                            <div>
                              <label htmlFor={`castAndCrew.writers[${i}].name`}>Name:</label>
                              <Field
                                id={`castAndCrew.writers[${i}].name`}
                                name={`castAndCrew.writers[${i}].name`}
                                placeholder="Name of the writer..."
                                type="text"
                              />
                            </div>
                            <div>
                              <label htmlFor={`castAndCrew.writers[${i}].role`}>Role:</label>
                              <Field
                                id={`castAndCrew.writers[${i}].role`}
                                name={`castAndCrew.writers[${i}].role`}
                                placeholder="Role of the writer..."
                                type="text"
                              />
                            </div>
                            <button type='button' onClick={() => arrayHelpers.remove(i)}>-</button>
                          </div>
                        ))
                      }
                      <button
                        type="button"
                        onClick={() =>
                          arrayHelpers.push({ name: '', role: '' })
                        }
                      >
                        +
                      </button>
                    </>
                  )}
                />
                <ErrorMessage name='castAndCrew.writers' component='p' />
              </div>
              {/* actors input fields */}
              <div>
                <label htmlFor="castAndCrew.actors">Actors:</label>
                <FieldArray
                  name="castAndCrew.actors"
                  render={arrayHelpers => (
                    <>
                      {
                        arrayHelpers.form.values.castAndCrew.actors?.map((_: string, i: number) => (
                          <div key={i}>
                            <div>
                              <label htmlFor={`castAndCrew.actors[${i}].name`}>Name:</label>
                              <Field
                                id={`castAndCrew.actors[${i}].name`}
                                name={`castAndCrew.actors[${i}].name`}
                                placeholder="Name of the actor..."
                                type="text"
                              />
                            </div>
                            <div>
                              <label htmlFor={`castAndCrew.actors[${i}].character`}>Character:</label>
                              <FieldArray
                                name={`castAndCrew.actors[${i}].character`}
                                render={charHelpers => (
                                  <>
                                    {
                                      charHelpers.form.values.castAndCrew.actors[i]?.character?.map((_: string, j: number) => (
                                        <div key={j}>
                                          <Field
                                            id={`castAndCrew.actors[${i}].character[${j}]`}
                                            name={`castAndCrew.actors[${i}].character[${j}]`}
                                            placeholder="Name of the character..."
                                            type="text"
                                          />
                                          <ErrorMessage name={`castAndCrew.actors[${i}].character[${j}]`} component="p" />
                                          <button type="button" onClick={() => charHelpers.remove(j)}>-</button>
                                        </div>
                                      ))
                                    }
                                    <button type="button" onClick={() => charHelpers.push('')}>+</button>
                                  </>
                                )}
                              />
                            </div>
                            <div>
                              <label htmlFor={`castAndCrew.actors[${i}].actorPhoto`}>Photo:</label>
                              <Field
                                id={`castAndCrew.actors[${i}].actorPhoto`}
                                name={`castAndCrew.actors[${i}].actorPhoto`}
                                placeholder="Photo url..."
                                type="url"
                              />
                            </div>
                            <button type="button" onClick={() => arrayHelpers.remove(i)}>-</button>
                          </div>
                        ))
                      }
                      <button
                        type="button"
                        onClick={() =>
                          arrayHelpers.push({ name: '', character: [''], actorPhoto: '' })
                        }
                      >
                        +
                      </button>
                    </>
                  )}
                />
                <ErrorMessage name="castAndCrew.actors" component="p" />
              </div>
              <div>
                <label htmlFor="reviews.metascore">Metascore:</label>
                <Field
                  id='reviews.metascore' name='reviews.metascore'
                  placeholder='Metascore...'
                  type='number'
                />
                <ErrorMessage name='reviews.metascore' component='p' />
              </div>
              <div>
                <label htmlFor="reviews.critics">Critics:</label>
                <Field
                  id='reviews.critics' name='reviews.critics'
                  placeholder='Number of Critics...'
                  type='number'
                />
                <ErrorMessage name='reviews.critics' component='p' />
              </div>
              <div>
                <label htmlFor="reviews.users">Users:</label>
                <Field
                  id='reviews.users' name='reviews.users'
                  placeholder='Number of Users...'
                  type='number'
                />
                <ErrorMessage name='reviews.users' component='p' />
              </div>
              {/* <Field type='submit' value='Add' /> */}
              <button type='submit'>Update</button>
              <button type='button'>Delete</button>
            </Form>
          </Formik>
        </div> :
        <p>Loading...</p>
      }
    </section>
  );
}
 
export default EditMovie;