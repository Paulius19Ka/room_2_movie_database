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

    > a{
      display: block;
      width: 180px;  

      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

      text-decoration: none;
      color: white; 
    }

    > a:hover{
      text-decoration: underline;
    }
  }

  > h3, div{
    padding: 0 10px;
  }

  > button{
    border: none;
    background-color:rgba(121, 121, 121, 0.15); 
    border-radius: 9999px;
    padding: 10px;
    width: 90%;

    color: rgba(60, 109, 214, 0.9);
    font-weight: bold;
  }

  > button:hover{
    background-color: rgba(59, 74, 102, 0.46);
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

    > span{
      display: flex;
    }
      
    > svg{
      color: rgba(60, 109, 214, 0.9); 
    }
    
    > svg:hover{
      color: white; 
      background-color:rgba(121, 121, 121, 0.15);
    }

  }

  > div.info{
    padding-bottom: 5px;
    display: flex;
    justify-content: space-between;
    margin-left: -15px;

    
    
    > a{
      display: flex;
      flex-direction: row;
      padding: 5px;

      text-decoration: none;
      color: white;
    }

    > a:hover{
      background-color:rgba(121, 121, 121, 0.15); 
      border-radius: 9999px;
      padding: 5px;
    }

    > div > button > svg{
      color: white; 
    }
    
    > div > button > svg:hover{
      background-color:rgba(121, 121, 121, 0.15);
    }

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
        {
          data.IMDB?.totalScore ?
          <span><StarIcon />{data.IMDB?.totalScore}</span> :
          <span><StarIcon />0</span>
        }
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