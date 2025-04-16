import { useContext } from "react";
import styled from "styled-components";

import MovieCard from "../UI/molecules/MovieCard";
import MoviesContext from "../contexts/MoviesContext";
import { MovieContextTypes } from "../types";

const StyledDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  margin: 0 10px;
`;

const Home = () => {

  const { movies } = useContext(MoviesContext) as MovieContextTypes;

  // logged in user use context here

  return (
    <section>
      <h2>Home</h2>
      <StyledDiv>
        {
          movies ?
          movies.map(movie => 
            <MovieCard
              data={movie}
              key={movie.id}
            />
          ) :
          <p>Loading...</p>
        }
      </StyledDiv>
    </section>
  );
}
 
export default Home;