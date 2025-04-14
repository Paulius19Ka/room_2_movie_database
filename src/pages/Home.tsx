
import styled from "styled-components";

import { useContext } from "react";
import MoviesContext from "../contexts/MoviesContext";
import MovieCard from "../UI/molecules/MovieCard";

import { Container, Skeleton, Box } from "@mui/material";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const StyledDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  margin: 0 10px;
`;

const Home = () => {
  const moviesContext = useContext(MoviesContext);

  if (!moviesContext) return <p>Loading...</p>;

  const { movies } = moviesContext;
  const isLoading = !movies || movies.length === 0;

  return (
    <Container sx={{ paddingTop: 4 }}>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          justifyContent: "center",
        }}
      >
        {isLoading
          ? [...Array(6)].map((_, i) => (
              <Box
                key={i}
                sx={{
                  width: 250,
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                }}
              >
                <Skeleton
              variant="rectangular"
              width="100%"
              height={360}
              animation="wave"
              sx={{ bgcolor: "#e0e0e0" }}
                />
          <Skeleton width="80%" sx={{ bgcolor: "#e0e0e0" }} />
          <Skeleton width="60%" sx={{ bgcolor: "#e0e0e0" }} />
              </Box>
            ))
          : movies.map((movie) => (
              <MovieCard key={movie.id} data={movie} />
            ))}
      </Box>
    </Container>
  );
};
export default Home;