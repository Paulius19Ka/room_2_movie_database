import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import MoviesContext from "../contexts/MoviesContext";
import { MovieContextTypes, UsersContextTypes } from "../types";
import { Movie } from "../movieTypes";
import styled from "styled-components";
import UsersContext from "../contexts/UsersContext";
import MuiModal from "../UI/atoms/MuiModal";

const StyledSection = styled.section`
  > div.movieWrapper{
    width: 990px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 10px;

    > div.movieHeadline{
      display: flex;
      align-items: center;
      justify-content: space-between;

      > div{

        > h2, span{
        margin: 0;
        }
      }

      > div.reviews{
        display: flex;
        gap: 20px;

        > div.imdbScore, div.metaScore{
          display: flex;
          flex-direction: column;
          align-items: flex-end;
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

    > div.movieBottom{
      display: flex;
      justify-content: space-between;

      > div.movieInfo{
        width: 80%;

        > p{
          margin: 0;
        }

        > div.movieGenres{
          display: flex;
          gap: 10px;

          > span{
            border: 1px solid grey;
            border-radius: 15px;

            padding: 0px 10px;

            &:hover{
              background-color: #4d4d4d;
            }
          }
        }

        > div.movieDirector, div.movieWriters, div.movieActors{
          display: flex;
          gap: 10px;

          > span{
            color: #478dff;
          }

          > div{
            display: flex;
            gap: 20px;

            > span{
              color: #478dff;
            }
          }

          > span.castType{
            color: white;
          }
        }
      }

      > div.movieButtons{
        display: flex;
        flex-direction: column;
        gap: 10px;
        align-self: flex-end;
        
        button, a{
          color: black;
          background-color: #f3ce13;
          border: none;
          border-radius: 15px;
          padding: 5px 10px;
          font-size: 1rem;
          text-transform: capitalize;
          text-decoration: none;
          cursor: pointer;
          line-height: 1;
          width: 100%;
          text-align: center;
        }
      }
    }
  }
`;

const SpecificMoviePage = () => {

  const { id } = useParams();
  const { findMovie, deleteMovie } = useContext(MoviesContext) as MovieContextTypes;
  const [movie, setMovie] = useState<Movie | undefined>(undefined);
  const { loggedInUser } = useContext(UsersContext) as UsersContextTypes;
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

    const deleteHandler = () => {
      if(id){
        deleteMovie(id);
        navigate('/');
      }
    }

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
            <div className="reviews">
              <div className="imdbScore">
                <span>IMDB Score</span>
                {
                  movie.IMDB?.totalScore ?
                  <span>{movie.IMDB?.totalScore}/10</span> :
                  <span>0/10</span>
                }
              </div>
              <div className="metaScore">
                <span>Metascore</span>
                <span>{movie.reviews.metascore}/100</span>
              </div>
            </div>
          </div>
          <div className="movieMedia">
            <img src={movie.photos.poster[0]} alt={movie.title} />
            <iframe width="560" height="315" src={`https://www.youtube.com/embed/${movie.videos.trailers[0].split("v=")[1].split("&")[0]}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin"></iframe>
          </div>
          <div className="movieBottom">
            <div className="movieInfo">
              <div className="movieGenres">
                {
                  movie.genres.map((genre, i) => <span key={i}>{genre}</span>)
                }
              </div>
              <p>{movie.description}</p>
              <div className="movieDirector">
                <span className="castType">Director</span>
                <span>{movie.castAndCrew.director}</span>
              </div>
              <div className="movieWriters">
                <span className="castType">Writers</span>
                <div>
                  {
                    movie.castAndCrew.writers.slice(0, 3).map((writer, i) => <span key={i}>{writer.name}</span>)
                  }
                </div>
              </div>
              <div className="movieActors">
                <span className="castType">Actors</span>
                <div>
                  {
                    movie.castAndCrew.actors.slice(0, 3).map((actor, i) => <span key={i}>{actor.name}</span>)
                  }
                </div>
              </div>
            </div>
            <div className="movieButtons">
              <button>Add to Watchlist</button>
              {
                loggedInUser?.role === 'admin' ?
                <>
                  <Link to={`/edit/${id}`}>Edit</Link>
                  <MuiModal
                    btnText='Delete'
                    function={deleteHandler}
                    type='movie'
                    name={movie ? movie.title : ''}
                    movie={movie}
                  />
                </> :
                <></>
              }
            </div>
          </div>
        </div> :
        <p>Loading...</p>
      }
    </StyledSection>
  );
}
 
export default SpecificMoviePage;