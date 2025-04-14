import styled from "styled-components";
import { useEffect, useState } from "react";

interface Movie {
    title: string;
    releaseYear: number;
    eirinCategory: string;
    length: number;
    type: string;
    trailerUrl: string;
    moreVideosUrl: string;
    morePhotosUrl: string;
    thumbnailUrl: string;
    genres: string[];
    description: string;
    rating: number;
    ranking: string;
    creator: string;
    creatorLink: string;
    stars: { name: string; link: string }[];
  }

const SpecificMoviePage = () => {
    const [movies, setMovies] = useState<Movie[]>([]); 
  
    useEffect(() => {
      const getMovies = async () => {
        try {
          const response = await fetch("/data.json"); 
          if (!response.ok) {
            throw new Error("Failed to load data.json");
          }
          const data = await response.json();
          setMovies(data);
        } catch (error) {
          console.error("Fetch error:", error);
        }
      };
  
      getMovies();
    }, []);

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
      height 250px; 
    }
    
    > section{
      display: flex;
      flex-direction: column;

      > p{
         overflow: hidden;
      }
    }
`

return (
    <StyledSection>
      <h2>Moviepage</h2>
  
      {movies.map((movie, index) => (
        <div key={index}>
          <HeroSection>
            <div>
              <a href="#">
                {movie.type.toLowerCase() === "tv series" && (
                  <span>Episode Guide</span>
                )}
                <span>{Math.floor(movie.length / 60)}h {movie.length % 60}m</span>
                <span>{/* need to add arrow button */}</span>
              </a>
            </div>
            <div>
              <div>
                <button>Watch</button>
              </div>
              <div>
                <button>Add to Favorites</button>
              </div>
            </div>
          </HeroSection>
  
          <StyledMovieHeader>
            <div>
              <h1>{movie.title}</h1>
            </div>
            <div>
              <p>{movie.type}</p>
            </div>
          </StyledMovieHeader>
  
          <StyledTrailer>
            <video controls src={movie.trailerUrl}></video>
            <div>
              <a href={movie.moreVideosUrl}>More Videos</a>
              <a href={movie.morePhotosUrl}>More Photos</a>
            </div>
          </StyledTrailer>
  
          <StyledGeneralInfo>
            <div>
              <img src={movie.thumbnailUrl} alt={movie.title} />
              <section>
                <div>{movie.genres.join(', ')}</div>
                <p>{movie.description}</p>
              </section>
            </div>
            <div>
              <div>
                <div>
                  <a href="#">{movie.rating}/10</a>
                </div>
                <div>
                  <button>Rate</button>
                </div>
                <div>
                  <a href="#">{movie.ranking}</a>
                </div>
              </div>
            </div>
            <div>
              <div>
                <h3>Creator</h3>
                <a href={movie.creatorLink}>{movie.creator}</a>
              </div>
              <span>{/* need to add arrow button */}</span>
            </div>
            <div>
              <div>
                <h3>Stars</h3>
                {movie.stars.map((star, i) => (
                  <a key={i} href={star.link}>{star.name}</a>
                ))}
              </div>
              <span>{/* need to add arrow button */}</span>
            </div>
          </StyledGeneralInfo>
        </div>
      ))}
    </StyledSection>
  )};

  export default SpecificMoviePage