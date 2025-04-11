import { useContext } from "react";
import MovieCard from "../UI/molecules/MovieCard";
import MoviesContext from "../contexts/MoviesContext";
import { MovieContextTypes } from "../types";

const Home = () => {

  const { movies } = useContext(MoviesContext) as MovieContextTypes;

  // logged in user use context here

  return (
    <section>
      <h2>Home</h2>
      <div>
        {
          movies ?
          movies.map(movie => 
            <MovieCard
              data={movie}
              key={movie.id}
            />
          ) :
          <p>SKELETON HERE!!!!!!!!!</p>
        }
      </div>
    </section>
  );
}
 
export default Home;