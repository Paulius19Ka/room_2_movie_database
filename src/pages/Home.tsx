
import styled from "styled-components";

import { useContext } from "react";
import MoviesContext from "../contexts/MoviesContext";
import MovieCard from "../UI/molecules/MovieCard";

import { Container, Skeleton } from "@mui/material";
const StyledDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  padding: 2rem 0;
`;

const Home = () => {
  const moviesContext = useContext(MoviesContext);

  if (!moviesContext) return <p>Loading...</p>;

  const { movies } = moviesContext;
  const isLoading = !movies || movies.length === 0;

  return (
    <Container>
      <StyledDiv>
        {isLoading
          ? [...Array(6)].map((_, i) => (
              <div
                key={i}
                style={{
                  width: 250,
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height={360}
                  animation="wave"
                  sx={{ bgcolor: "#465335" }}
                />
                <Skeleton width="80%" sx={{ bgcolor: "#465335" }} />
                <Skeleton width="60%" sx={{ bgcolor: "#465335" }} />
              </div>
            ))
          : movies.map((movie) => (
              <MovieCard key={movie.id} data={movie} />
            ))}
      </StyledDiv>
    </Container>
  );
};

export default Home;