import { v4 as genID } from 'uuid';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useContext, useState } from 'react';
import { AgeRating, Movie, GenresType } from '../movieTypes';

type InitialValuesType = Movie;

const movieRatings: AgeRating[] = [
  'Select an age Rating',
  'G',
  'PG',
  'PG-13',
  'R',
  'NC-17'
];

const movieGenres: GenresType = [
  'Select a genre',
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

const AddMovie = () => {

  const initialValues: InitialValuesType = {
    id: '',
    title: '',
    releaseYear: 1900,
    eirinCategory: 'Select an age Rating',
    length: 0,
    photos: {
      poster: [],
      cutscenes: [],
      videos: {
        trailers: [],
        cutscenes: []
      }
    },
    videos: {
      trailers: [],
      cutscenes: []
    },
    genres: ['Select a genre'],
    description: '',
    castAndCrew: {
      director: '',
      writers: []
    },
    actors: [],
    reviews: {
      metascore: 0
    }
  }

  const submitHandler = (values: InitialValuesType) => {
    console.log(values);
  }

  return (
    <section>
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
          <div> {/* need to add functionality to push items into an array */}
            <label htmlFor="photos.poster">Photos:</label>
            <Field
              id='photos.poster' name='photos.poster'
              placeholder='Url of a picture...'
              type='ulr'
            />
            <ErrorMessage name='photos.poster' component='p' />
          </div>
          <div> {/* need to add functionality to push items into an array */}
            <label htmlFor="videos.trailers">Videos:</label>
            <Field
              id='videos.trailers' name='videos.trailers'
              placeholder='Url of a trailer...'
              type='ulr'
            />
            <ErrorMessage name='videos.trailers' component='p' />
          </div>
          {/* checkbox for genres */}
          {/* description textarea */}
          {/* crew input fields */}
          {/* actors input fields */}
          {/* metascore input field */}
          <Field type='submit' value='Add' />
        </Form>
      </Formik>
    </section>
  );
}
 
export default AddMovie;