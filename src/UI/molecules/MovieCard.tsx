import styled from "styled-components";
// import InfoOutlineIcon from '@mui/icons-material/InfoOutline';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import EditIcon from '@mui/icons-material/Edit';

import { Movie } from "../../movieTypes";
import { Link, useNavigate } from "react-router";
import { useContext } from "react";
import UsersContext from "../../contexts/UsersContext";
import { UsersContextTypes } from "../../types";
import MuiModal from "../atoms/MuiModal";

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

  const { loggedInUser, dispatch } = useContext(UsersContext) as UsersContextTypes;
  const navigate = useNavigate();
  const addToWatchlist = () => {
    if (!loggedInUser) {
      navigate('/login');
      return;
    }
    dispatch({
      type: 'addToWatchlist',
      userId: loggedInUser.id,
      movieId: data.id
    });
  };

  return (
    <StyledDiv>
      <img src={data.photos.poster[0]} alt={data.title} />
      <div className="rating">
        <span><StarIcon />{data.IMDB?.totalScore}</span>
        <StarBorderIcon /> {/* add rating functionality here */}
      </div>
      <h3><Link to={`${data.id}`}>{data.title}</Link></h3>
      <button onClick={addToWatchlist}>+ Watchlist</button>
      <div className="info">
        <Link to={data.videos.trailers[0]} target="_blank"><PlayArrowIcon />Trailer</Link>
        {/* <Link to={`${data.id}`}><InfoOutlineIcon /></Link> */}
        <MuiModal
          btnText='infoIcon'
          function={() => { }}
          type='info'
          name={data ? data.title : ''}
          movie={data}
        />
        {
          loggedInUser?.role === 'admin' ?
            <Link to={`edit/${data.id}`}><EditIcon /></Link> :
            <></>
        }
      </div>
    </StyledDiv>
  );
}

export default MovieCard;