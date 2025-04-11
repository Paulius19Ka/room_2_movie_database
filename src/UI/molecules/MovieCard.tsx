import styled from "styled-components";
import InfoOutlineIcon from '@mui/icons-material/InfoOutline';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

import { Movie } from "../../movieTypes";
import { Link } from "react-router";

type Props = {
  data: Movie
}

const StyledDiv = styled.div`
  background-color: #131313;
  width: 200px;
  height: 450px;
  border-radius: 10px;
  border-top-left-radius: 0px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  > h3, p{
    margin: 0;
  }

  > h3{
    align-self: flex-start;
    font-size: 1.1em;
  }

  > h3, div{
    padding: 0 10px;
  }

  > img{
    width: 100%;
    height: 300px;
    object-fit: cover;
    border-top-right-radius: 10px;
  }

  > div{
    width: 70%;

    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  > div.rating{
    width: 60%;
    padding-top: 5px;

    align-self: flex-start;
  }

  > div.info{
    padding-bottom: 5px;
  }
`;

const MovieCard = ({ data }: Props) => {
  return (
    <StyledDiv>
      <img src={data.photos.poster[0]} alt={data.title} />
      <div className="rating">
        <span><StarIcon />{data.IMDB.totalScore}</span>
        <StarBorderIcon /> {/* add rating functionality here */}
      </div>
      <h3>{data.title}</h3>
      <button>+ Watchlist</button>
      <div className="info">
        <Link to={data.videos.trailers[0]}><PlayArrowIcon />Trailer</Link>
        <Link to="/MOREINFOPAGEHERE"><InfoOutlineIcon /></Link> {/* add link to specific page */}
      </div>
    </StyledDiv>
  );
}
 
export default MovieCard;