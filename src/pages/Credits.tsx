import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import MoviesContext from "../contexts/MoviesContext";
import { MovieContextTypes } from "../types";
import { Movie } from "../movieTypes";
import styled from "styled-components";

const StyledSection = styled.section`
  > div.movieInfo{
    display: flex;
    justify-content: flex-start;
    gap: 20px;

    > img{
      width: 100px;
      height: 150px;
      object-fit: cover;
    }
    > div{

      > h1{
        margin: 0;
      }

      > div{
        display: flex;
        align-items: center;
        gap: 10px;

        > h3{
          margin: 0;
        }
      }
    }
  }
`;

const Credits = () => {

  const { id } = useParams();
  const { findMovie } = useContext(MoviesContext) as MovieContextTypes;
  const [movie, setMovie] = useState<Movie | undefined>(undefined);
  const navigate = useNavigate();

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
        <>
          <div className="movieInfo">
            <img src={movie.photos.poster[0]} alt={movie.title} />
            <div>
              <div>
                <h3>{movie.title}</h3>
                <span>({movie.releaseYear})</span>
              </div>
              <h1>Full Cast & Crew</h1>
              <button onClick={() => navigate(-1)}>Back</button>
            </div>
          </div>
          <div className="cast">
            <div className="director">
              <h4>Directed by</h4>
              <div>
                <span>{movie.castAndCrew.director}</span>
                <span>...</span>
                <span>{Object.keys(movie.castAndCrew)[0]}</span>
              </div>
            </div>
            <div className="writers">
              <h4>Written by</h4>
              <div>
                {
                  movie.castAndCrew.writers.map(writer => (
                    <div>
                      <span>{writer.name}</span>
                      <span>...</span>
                      <span>{writer.role}</span>
                    </div>
                  ))
                }
              </div>
            </div>
            <div className="actors">
              <h4>Cast</h4>
              <div>
                {
                  movie.castAndCrew.actors.map(actor => (
                    <div>
                      <div>
                        <img src={actor.actorPhoto} alt={actor.name} />
                        <span>{actor.name}</span>
                      </div>
                      <div>
                        <span>...</span>
                        <span>{actor.character.join(' / ')}</span>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        </> :
        <p>Loading...</p>
      }
    </StyledSection>
  );
}
 
export default Credits;