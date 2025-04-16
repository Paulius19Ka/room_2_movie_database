import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import MoviesContext from "../contexts/MoviesContext";
import { MovieContextTypes } from "../types";
import { Movie } from "../movieTypes";
import styled from "styled-components";

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 20px;

  span{
    font-size: 1.1rem;
  }

  > div.movieInfo{
    display: flex;
    justify-content: flex-start;
    gap: 10px;

    > img{
      width: 100px;
      height: 150px;
      object-fit: cover;
      border-radius: 5px;
    }
    > div{

      > h1{
        margin: 0;
        font-size: 1.6rem;
      }

      > button{
        border: none;
        border-radius: 9999px;
        padding: 15px 40px;
        font-size: 1.5rem;
        margin-top: 10px;
        margin-left: 25px;
        

        &:hover{
          cursor: pointer;
          background-color: #171717;
        }
      }

      > div{
        display: flex;
        align-items: center;
        gap: 10px;

        > h3, span{
          margin: 0;
          font-size: 1.3rem;
        }
      }
    }
  }

  > div.cast{
    display: flex;
    flex-direction: column;
    gap: 20px;

    > div.director, div.writers, div.actors{
      border: 1px dashed grey;
      border-radius: 7px;
      padding: 5px 10px;
      
      > div{
        display: flex;
        flex-direction: column;
      }
    }

    > div.director{

      > div{
        display: grid;
        grid-template-columns: 1fr 2fr;

        > div{
          display: flex;
          align-items: center;
          gap: 5px;
        }
      }
    }

    > div.writers{
      
      >div > div{
        display: grid;
        grid-template-columns: 1fr 2fr;
        }
     
      > div > div > div{
        display: flex;
        align-items: center;
        gap: 5px; 
      }
    }

    > div.actors{

      > div{
        display: flex;
        flex-direction: column;
        gap: 5px;

        > div{

        display: grid;
        grid-template-columns: 1fr 2fr;

          padding-right: 5px;

          &:nth-child(odd){
            background-color: #171717;
          }

          > div{
            display: flex;
            align-items: center;
            gap: 5px;

            > img{
              width: 40px;
              height: 40px;
              object-fit: cover;
            }
          }
        }
      }
    }

    h4{
      margin: 0;
    }

    @media (min-width: 768px){

      > div.director > div{
        display: grid;
        grid-template-columns: 2fr 2fr;
      }

      > div.writers{
      
      >div > div{
        display: grid;
        grid-template-columns: 2fr 2fr;
        }
      } 
        
      > div.actors{
        > div > div{
          display: grid; 
          grid-template-columns: 2fr 2fr; 
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
                <div>
                  <span>...</span>
                  <span>{Object.keys(movie.castAndCrew)[0]}</span>
                </div>
              </div>
            </div>
            <div className="writers">
              <h4>Written by</h4>
              <div>
                {
                  movie.castAndCrew.writers.map(writer => (
                    <div>
                      <span>{writer.name}</span>
                      <div>
                        <span>...</span>
                        <span>{writer.role}</span>
                      </div>
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