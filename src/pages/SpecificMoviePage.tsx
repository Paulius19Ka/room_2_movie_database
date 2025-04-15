import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import MoviesContext from "../contexts/MoviesContext";
import { MovieContextTypes } from "../types";
import { Movie } from "../movieTypes";
import styled from "styled-components";

const StyledSection = styled.section`
  > div.movieWrapper{
    width: 990px;

    > div.movieHeadline{
      display: flex;
      align-items: center;
      justify-content: space-between;

      > div.imdbScore{
        display: flex;
        flex-direction: column;
        align-items: flex-end;
      }

      > div{
        > h2, span{
        margin: 0;
        }
      }
    }

    > div.movieMedia{
      display: flex;
      gap: 10px;

      > img, iframe{
        border-radius: 15px;
      }

      > img{
        width: 280px;
        height: 450px;
        object-fit: cover;
      }
      > iframe{
        width: 700px;
        height: 450px;
      }
    }

    > div.movieInfo{
      > div.movieDirector, div.movieWriters, div.movieActors{
        display: flex;
        gap: 20px;

        > div{
          display: flex;
          gap: 10px;
        }
      }
    }
  }
`;

const SpecificMoviePage = () => {

  const { id } = useParams();
  const { findMovie } = useContext(MoviesContext) as MovieContextTypes;
  const [movie, setMovie] = useState<Movie | undefined>(undefined);

    useEffect(() => {
      if(id){
        const foundMovie = findMovie(id);
        if(foundMovie && typeof foundMovie === 'object'){
          setMovie(foundMovie);
        }
      }
      // console.log(movie);
    }, [id, findMovie, movie]);

  return (
    <StyledSection>
      {
        movie ?
        <div className="movieWrapper">
          <div className="movieHeadline">
            <div>
              <h2>{movie.title}</h2>
              <div>
                <span>{movie.releaseYear}</span>
                <span>⬩</span>
                <span>{movie.eirinCategory}</span>
                <span>⬩</span>
                <span>{Math.floor(movie.length / 60)}h {movie.length % 60}m</span>
              </div>
            </div>
            <div className="imdbScore">
              <span>IMDB Score</span>
              <span>{movie.IMDB?.totalScore}/10</span>
            </div>
          </div>
          <div className="movieMedia">
            <img src={movie.photos.poster[0]} alt={movie.title} />
            <iframe width="560" height="315" src={`https://www.youtube.com/embed/${movie.videos.trailers[0].split("v=")[1].split("&")[0]}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin"></iframe>
          </div>
          <div className="movieInfo">
            <div className="movieGenres">
              {
                movie.genres.map(genre => <span>{genre}</span>)
              }
            </div>
            <p>{movie.description}</p>
            <div className="movieDirector">
              <span>Director</span>
              <span>{movie.castAndCrew.director}</span>
            </div>
            <div className="movieWriters">
              <span>Writers</span>
              <div>
                {
                  movie.castAndCrew.writers.slice(0, 3).map(writer => <span>{writer.name}</span>)
                }
              </div>
            </div>
            <div className="movieActors">
              <span>Actors</span>
              <div>
                {
                  movie.castAndCrew.actors.slice(0, 3).map(actor => <span>{actor.name}</span>)
                }
              </div>
            </div>
          </div>
        </div> :
        <p>Loading...</p>
      }
    </StyledSection>
  );
}
 
export default SpecificMoviePage;