import styled from "styled-components";
import { useEffect, useState } from "react";
import { Movie } from "../movieTypes";
import MoviesContext from "../contexts/MoviesContext";
import { MovieContextTypes } from "../types";
import { useContext } from "react";
import { useParams } from "react-router";

const StyledSection = styled.section`
> form{
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-start;
  }
  `;
  
  const HeroSection = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: space-around;
  `;
  
  const StyledMovieHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-content: flex-start;
  
  `;
  
  const StyledTrailer = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
  
  > video {
    display: flex;
    flex-grow: 1;
    border-radius: 15px;
    }
    
    > div{
      display: flex;
      flex-direction: row;
      gap: 10px;
      justify-content: space-evenly;
      
      > a{
        display: flex; 
        align-content: center;
        justify-content: center;
        }
        }
        `
        
        const StyledGeneralInfo = styled.div`
        display: flex;
        flex-direction: row;
        
        > img{
          border-radius: 15px;
          width: 100px;
          height: 250px; 
          }
          
          > section{
            display: flex;
            flex-direction: column;
            
            > p{
              overflow: hidden;
              }
              }
              `

  const SpecificMoviePage = () => {

  const { id } = useParams<{id: string}>();
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
  
      {movie ? (
        <div>

          {/* <HeroSection> */}
            {/* <div> */}
              {/* <a href="#"> */}
                {/* <span>need to add arrow button</span> would be needed if it was a tv series. */}
              {/* </a> */}
            {/* </div> */}
            {/* <div>
              <div>
                <button>
                  {<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" role="presentation"><path d="M12.036 17.153a4.579 4.579 0 0 1 5.117-5.117c1.97.239 3.604 1.802 3.935 3.758a4.576 4.576 0 0 1-1.042 3.76l.197.19h.556L22.5 21.5a.743.743 0 0 1 0 1.049.743.743 0 0 1-1.049 0l-1.708-1.75v-.556l-.19-.197a4.576 4.576 0 0 1-3.759 1.042c-1.956-.331-3.519-1.964-3.758-3.935zm4.54-3.745a3.163 3.163 0 0 0-3.168 3.168 3.163 3.163 0 0 0 3.168 3.167 3.163 3.163 0 0 0 3.167-3.167 3.163 3.163 0 0 0-3.167-3.168zM8.298 11.972c1.47 0 2.73 1.26 2.73 2.73v3.464c0 1.574-1.26 2.834-2.73 2.834H4.834A2.822 2.822 0 0 1 2 18.166v-3.464c0-1.47 1.26-2.73 2.73-2.73h3.568zm0 1.47H4.834c-.735 0-1.26.525-1.26 1.26v3.464c0 .735.525 1.26 1.26 1.26h3.464c.735 0 1.26-.525 1.26-1.26v-3.464c0-.63-.525-1.26-1.26-1.26zM8.298 2c1.47 0 2.73 1.26 2.73 2.73v3.463c0 1.575-1.26 2.73-2.73 2.73H4.834C3.26 10.923 2 9.768 2 8.193V4.73C2 3.26 3.26 2 4.73 2h3.568zm0 1.47H4.834c-.735 0-1.26.524-1.26 1.26v3.463c0 .735.525 1.26 1.26 1.26h3.464c.735 0 1.26-.525 1.26-1.26V4.73c0-.735-.525-1.26-1.26-1.26zM18.27 2C19.74 2 21 3.26 21 4.73v3.463c0 1.575-1.155 2.73-2.73 2.73h-3.463c-1.47 0-2.73-1.26-2.73-2.73V4.73c0-1.47 1.26-2.729 2.73-2.729h3.464zm0 1.47h-3.463c-.735 0-1.26.524-1.26 1.26v3.463c0 .735.525 1.26 1.26 1.26h3.464c.735 0 1.26-.525 1.26-1.26V4.73c0-.735-.525-1.26-1.26-1.26z"></path></svg>}
                  <span>All Topics</span>
                  </button>
              </div>
              <div>
                <button>{<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" role="presentation"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"></path></svg>}</button>
              </div>
            </div>
          </HeroSection> */}
  
          <StyledMovieHeader>
            <div>
              <h1>{movie.title}</h1>
              <div>
                <span>{movie.releaseYear}</span>
                <span>⬩</span>
                <span>{movie.eirinCategory}</span>
                <span>⬩</span>
                <span>{Math.floor(movie.length / 60)}h {movie.length % 60}m</span>
              </div>
              <div>
                <a href="#">{movie.IMDB?.totalScore}/10</a>
              </div>
            </div>
          </StyledMovieHeader>
  
          <StyledTrailer>
            <video controls src={movie.videos.trailers[0]}></video>
            <div>
              <a href={movie.videos.cutscenes[3]}>More Videos</a>
              <a href={movie.photos.cutscenes[2]}>More Photos</a>
            </div>
          </StyledTrailer>
  
          <StyledGeneralInfo>
            <div>
              <img src={movie.photos.poster[0]} alt={movie.title} />
              <section>
                <div>{movie.genres.join(', ')}</div>
                <p>{movie.description}</p>
              </section>
            </div>
            <div>
              <div>
                <div>
                  <a href="#">{movie.IMDB?.totalScore}/10</a>
                </div>
                <div>
                  <button>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" role="presentation"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M19.65 9.04l-4.84-.42-1.89-4.45c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18-1.1 4.72c-.2.86.73 1.54 1.49 1.08l4.15-2.5 4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.73 3.67-3.18c.67-.58.32-1.68-.56-1.75zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"></path></svg>
                    <div>Rate</div>
                  </button>
                </div>
                <div>
                  <a href="#">{movie.popularity?.ranking}</a>
                </div>
              </div>
            </div>
            <div>
              <div>
                <h3>Writers</h3>
                {movie.castAndCrew.writers.map((writer, i) => (
                  <a key={i} href="">{writer.name}</a>
                ))}
              </div>
              <span>{<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" role="presentation"><path d="M5.622.631A2.153 2.153 0 0 0 5 2.147c0 .568.224 1.113.622 1.515l8.249 8.34-8.25 8.34a2.16 2.16 0 0 0-.548 2.07c.196.74.768 1.317 1.499 1.515a2.104 2.104 0 0 0 2.048-.555l9.758-9.866a2.153 2.153 0 0 0 0-3.03L8.62.61C7.812-.207 6.45-.207 5.622.63z"></path></svg>}</span>
            </div>
            <div>
              <div>
                <h3>Stars</h3>
                <div>
                {movie.castAndCrew.actors.map((actor, i) => (
                  <a key={i} href="#">{actor.name}</a>
                ))};
                </div>
              </div>
              <span>{<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" role="presentation"><path d="M5.622.631A2.153 2.153 0 0 0 5 2.147c0 .568.224 1.113.622 1.515l8.249 8.34-8.25 8.34a2.16 2.16 0 0 0-.548 2.07c.196.74.768 1.317 1.499 1.515a2.104 2.104 0 0 0 2.048-.555l9.758-9.866a2.153 2.153 0 0 0 0-3.03L8.62.61C7.812-.207 6.45-.207 5.622.63z"></path></svg>}</span>
            </div>
          </StyledGeneralInfo>
        </div>
      ): (
        <div>Loading...</div>)}
    </StyledSection>
  )};

  export default SpecificMoviePage