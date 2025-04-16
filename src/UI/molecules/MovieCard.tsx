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
  background-color: var(--background-secondary);
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
      color: var(--text-primary); 
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
    background-color:#79797926;
    border-radius: 9999px;
    padding: 10px;
    width: 90%;

    color: rgba(60, 109, 214, 0.9);
    font-weight: bold;
  }

  > button:hover{
    background-color: #3b4a6675;
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
      color: #3c6dd6e5; 
    }
    
    > svg:hover{
      color: var(--text-primary); 
      background-color:#79797926;
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
      color: var(--text-secondary);
    }

    > a:hover{
      background-color:#79797926; 
      border-radius: 9999px;
      padding: 5px;
    }

    > div > button > svg{
      color: var(--text-secondary);
    }
    
    > div > button > svg:hover{
      background-color:#79797926;
    }

    & :nth-child(3){
      display: none;
    }

    }
`;

const MovieCard = ({ data }: Props) => {

  const { loggedInUser } = useContext(UsersContext) as UsersContextTypes;
  const navigate = useNavigate();

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
      {
        loggedInUser ?
        <button>+ Watchlist</button> :
        <button onClick={() => navigate('/login')}>+ Watchlist</button>
      }
      <div className="info">
        <Link to={data.videos.trailers[0]} target="_blank"><PlayArrowIcon />Trailer</Link>
        {/* <Link to={`${data.id}`}><InfoOutlineIcon /></Link> */}
        <MuiModal
          btnText='infoIcon'
          function={() => {}}
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