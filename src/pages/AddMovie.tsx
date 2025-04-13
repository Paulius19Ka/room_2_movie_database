import { v4 as genID } from 'uuid';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import { useContext } from 'react';
import { AgeRating, Movie } from '../movieTypes';
import styled from 'styled-components';
import MoviesContext from '../contexts/MoviesContext';
import { MovieContextTypes } from '../types';

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
      writers: []
    },
    actors: [],
    reviews: {
      metascore: 0,
      critics: 0,
      users: 0
    }
  }

  const submitHandler = (values: InitialValuesType, { resetForm }: { resetForm: () => void }) => {
    values.id = genID();
    console.log(values);
    addMovie(values);
    resetForm();
  }

  return (
    <StyledSection>
      <h2>Add Movie</h2>
      <Formik 
        initialValues={initialValues}
        onSubmit={submitHandler}
        // validationSchema={} // add validation schema
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
                          id={`photos.poster.${i}`} name={`photos.poster.[${i}]`}
                          placeholder='Url of a picture...'
                          type='url'
                          disabled={i < arrayHelpers.form.values.photos.poster.length - 1}
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
                          id={`photos.cutscenes.${i}`} name={`photos.cutscenes.[${i}]`}
                          placeholder='Url of a picture...'
                          type='url'
                          disabled={i < arrayHelpers.form.values.photos.cutscenes.length - 1}
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
                          id={`videos.trailers.${i}`} name={`videos.trailers.[${i}]`}
                          placeholder='Url of a video...'
                          type='url'
                          disabled={i < arrayHelpers.form.values.videos.trailers.length - 1}
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
                          id={`videos.cutscenes.${i}`} name={`videos.cutscenes.[${i}]`}
                          placeholder='Url of a video...'
                          type='url'
                          disabled={i < arrayHelpers.form.values.videos.cutscenes.length - 1}
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
                    arrayHelpers.form.values.castAndCrew.writers.map((_: string, i: number) => (
                      <div key={i}>
                        <div>
                          <label htmlFor={`castAndCrew.writers[${i}].name`}>Name:</label>
                          <Field
                            id={`castAndCrew.writers[${i}].name`}
                            name={`castAndCrew.writers[${i}].name`}
                            placeholder="Name of the writer..."
                            type="text"
                            disabled={i < arrayHelpers.form.values.castAndCrew.writers.length - 1}
                          />
                        </div>
                        <div>
                          <label htmlFor={`castAndCrew.writers[${i}].role`}>Role:</label>
                          <Field
                            id={`castAndCrew.writers[${i}].role`}
                            name={`castAndCrew.writers[${i}].role`}
                            placeholder="Role of the writer..."
                            type="text"
                            disabled={i < arrayHelpers.form.values.castAndCrew.writers.length - 1}
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
            <label htmlFor="actors">Actors:</label>
            <FieldArray
              name="actors"
              render={arrayHelpers => (
                <>
                  {
                    arrayHelpers.form.values.actors.map((_: string, i: number) => (
                      <div key={i}>
                        <div>
                          <label htmlFor={`actors[${i}].name`}>Name:</label>
                          <Field
                            id={`actors[${i}].name`}
                            name={`actors[${i}].name`}
                            placeholder="Name of the actor..."
                            type="text"
                            disabled={i < arrayHelpers.form.values.actors.length - 1}
                          />
                        </div>
                        <div>
                          <label htmlFor={`actors[${i}].character`}>Character:</label>
                          <FieldArray
                            name={`actors[${i}].character`}
                            render={charHelpers => (
                              <>
                                {
                                  charHelpers.form.values.actors[i]?.character?.map((_: string, j: number) => (
                                    <div key={j}>
                                      <Field
                                        id={`actors[${i}].character[${j}]`}
                                        name={`actors[${i}].character[${j}]`}
                                        placeholder="Name of the character..."
                                        type="text"
                                      />
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
                          <label htmlFor={`actors[${i}].actorPhoto`}>Photo:</label>
                          <Field
                            id={`actors[${i}].actorPhoto`}
                            name={`actors[${i}].actorPhoto`}
                            placeholder="Photo url..."
                            type="url"
                            disabled={i < arrayHelpers.form.values.actors.length - 1}
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
            <ErrorMessage name="actors" component="p" />
          </div>
          <div>
            <label htmlFor="reviews.metascore">Metascore:</label>
            <Field
              id='reviews.metascore' name='reviews.metascore'
              placeholder='Metascore...'
              type='number'
            />
            <ErrorMessage name='reviews.critics' component='p' />
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
    </StyledSection>
  );
}
 
export default AddMovie;