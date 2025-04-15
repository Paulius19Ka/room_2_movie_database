import { v4 as genID } from 'uuid';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import { useContext, useEffect, useState } from 'react';
import { AgeRating, Movie } from '../movieTypes';
import styled from 'styled-components';
import MoviesContext from '../contexts/MoviesContext';
import { MovieContextTypes } from '../types';
import { useNavigate } from 'react-router';
import { Container, Skeleton } from "@mui/material";

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

const StyledSection = styled.section`
  > form{
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: flex-start;
  }
`;

const AddMovie = () => {

  const { addMovie } = useContext(MoviesContext) as MovieContextTypes;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);
  

  const initialValues: InitialValuesType = {
    id: '',
    title: '',
    releaseYear: 1900,
    eirinCategory: 'Select an age Rating',
    length: 0,
    photos: {
      poster: [],
      cutscenes: []
    },
    videos: {
      trailers: [],
      cutscenes: []
    },
    genres: [],
    description: '',
    castAndCrew: {
      director: '',
      writers: [{ name: '', role: '' }],
      actors: [{ name: '', character: [''], actorPhoto: '' }]
    },
    reviews: {
      metascore: 0,
      critics: 0,
      users: 0
    }
  }

  const submitHandler = (values: InitialValuesType) => {
    values.id = genID();
    // console.log(values);
    addMovie(values);
    navigate('/');
  }

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
              .required('Field is required')
              .trim(),
            role: Yup.string()
              .required('Field is required')
              .trim(),
          })
        )
        .min(1, 'Must have at least one writer'),
      actors: Yup.array()
        .of(
          Yup.object({
            name: Yup.string()
              .required('Field is required'),
            character: Yup.array()
              .of(
                Yup.string()
                  .required('Field is required'),
              ),
            actorPhoto: Yup.string()
              .url('Must be a valid url')
              .required('Field is required'),
          })
        )
        .min(1, 'Must have at least one actor'),
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

  return (
    <Container>
    <StyledSection>
      <h2>Add Movie</h2>
      {loading ? (
          <>
            <Skeleton height={50} width="40%" sx={{ bgcolor: "#465335" }} />
            <Skeleton height={600} width="100%" sx={{ bgcolor: "#465335" }} />
            <Skeleton height={40} width="20%" sx={{ bgcolor: "#465335" }} />
          </>
        ) : (
      
      <Formik 
        initialValues={initialValues}
        onSubmit={submitHandler}
        validationSchema={validSchema}
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
                          // disabled={i < arrayHelpers.form.values.photos.poster.length - 1}
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
                          // disabled={i < arrayHelpers.form.values.photos.cutscenes.length - 1}
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
                          // disabled={i < arrayHelpers.form.values.videos.trailers.length - 1}
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
                          // disabled={i < arrayHelpers.form.values.videos.cutscenes.length - 1}
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
                    arrayHelpers.form.values.castAndCrew.writers.map((_: { name: string, role: string }, i: number) => (
                      <div key={i}>
                        <div>
                          <label htmlFor={`castAndCrew.writers[${i}].name`}>Name:</label>
                          <Field
                            id={`castAndCrew.writers[${i}].name`}
                            name={`castAndCrew.writers[${i}].name`}
                            placeholder="Name of the writer..."
                            type="text"
                            // disabled={i < arrayHelpers.form.values.castAndCrew.writers.length - 1}
                          />
                          <ErrorMessage name={`castAndCrew.writers[${i}].name`} component="p" />
                        </div>
                        <div>
                          <label htmlFor={`castAndCrew.writers[${i}].role`}>Role:</label>
                          <Field
                            id={`castAndCrew.writers[${i}].role`}
                            name={`castAndCrew.writers[${i}].role`}
                            placeholder="Role of the writer..."
                            type="text"
                            // disabled={i < arrayHelpers.form.values.castAndCrew.writers.length - 1}
                          />
                          <ErrorMessage name={`castAndCrew.writers[${i}].role`} component="p" />
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
                    arrayHelpers.form.values.castAndCrew.actors.map((_: { name: string, character: string[], actorPhoto: string }, i: number) => (
                      <div key={i}>
                        <div>
                          <label htmlFor={`castAndCrew.actors[${i}].name`}>Name:</label>
                          <Field
                            id={`castAndCrew.actors[${i}].name`}
                            name={`castAndCrew.actors[${i}].name`}
                            placeholder="Name of the actor..."
                            type="text"
                            // disabled={i < arrayHelpers.form.values.castAndCrew.actors.length - 1}
                          />
                          <ErrorMessage name={`castAndCrew.actors[${i}].name`} component="p" />
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
                            // disabled={i < arrayHelpers.form.values.castAndCrew.actors.length - 1}
                          />
                          <ErrorMessage name={`castAndCrew.actors[${i}].actorPhoto`} component="p" />
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
            {/* <ErrorMessage name="castAndCrew.actors" component="p" /> */}
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
          <button type='submit'>Add</button>
        </Form>
      </Formik>
    )}
    </StyledSection>
  </Container>
);
};

export default AddMovie;