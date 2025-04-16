import { useContext } from "react";
import styled from "styled-components";

import MovieCard from "../UI/molecules/MovieCard";
import MoviesContext from "../contexts/MoviesContext";
import { MovieContextTypes } from "../types";

import UsersContext from "../contexts/UsersContext";
import { UsersContextTypes } from "../types";

const StyledDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  margin: 0 10px;
`;

const Watchlist = () => {

    const { movies } = useContext(MoviesContext) as MovieContextTypes;

    const { loggedInUser } = useContext(UsersContext) as UsersContextTypes;

    return (
        <section>
            <h2 style={{ textAlign: "center" }}>{loggedInUser?.username}'s Watchlist</h2>
            <StyledDiv>
                {
                    loggedInUser && movies ?
                        movies
                            .filter(movie => loggedInUser.watchlistItems?.includes(movie.id))
                            .map(movie =>
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

export default Watchlist;