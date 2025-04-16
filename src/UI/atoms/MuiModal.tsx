import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import InfoOutlineIcon from '@mui/icons-material/InfoOutline';
import { Movie } from '../../movieTypes';
import styled from 'styled-components';
import { Link } from 'react-router';
import { useContext } from 'react';
import UsersContext from '../../contexts/UsersContext';
import { UsersContextTypes } from '../../types';
import { useNavigate } from 'react-router';

type Props = {
  btnText: string,
  name: string,
  type: string,
  function: () => void,
  movie: Movie
}

const style = {
  color: 'grey.50',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'grey.900',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const StyledInfoDiv = styled.div`
  > div{
    display: grid;
    grid-template-columns: 30% 70%;
    grid-template-rows: 1fr;
    gap: 10px;

    > div{

      > h2{
        margin: 0;
      }

      > div{
        
        > div.info{
          width: 70%;

          display: flex;
          justify-content: space-between;
        }
      }
    }

    > img{
    width: 100px;
    height: 150px;
    object-fit: cover;
  }
  }

  > p{
    margin: 0;
  }

  > div.buttons{
    display: flex;
    justify-content: center;
  }

  > .message {
    color: yellow;
    margin-top: 10px;
    font-size: 1em;
  }

`;

const MuiModal = (props: Props) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { loggedInUser, dispatch } = useContext(UsersContext) as UsersContextTypes; // Access context
  const navigate = useNavigate();
  const [watchlistMessage, setWatchlistMessage] = React.useState<string>('');


  const addToWatchlist = () => {
    if (!loggedInUser) {
      navigate('/login');
      return;
    }
    dispatch({
      type: 'addToWatchlist',
      userId: loggedInUser.id,
      movieId: props.movie.id
    });
    setWatchlistMessage('Added to Watchlist');
    setTimeout(() => {
      setWatchlistMessage('');
      handleClose();
    }, 2000);
  };

  return (
    <div>
      <Button onClick={handleOpen}>{props.btnText === 'Delete' ? props.btnText : <InfoOutlineIcon />}</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            {
              props.btnText === 'Delete' ?
                <>
                  <Typography id="transition-modal-title" variant="h6" component="h2">
                    Are you sure you want to {props.btnText.toLowerCase()} the {props.type} "{props.name}"?
                  </Typography>
                  <Button onClick={() => props.function()}>{props.btnText}</Button>
                  <Button onClick={handleClose}>Cancel</Button>
                </> :
                props.movie && props.btnText === 'infoIcon' ?
                  <StyledInfoDiv>
                    <div>
                      <img src={props.movie.photos.poster[0]} alt={props.movie.title} />
                      <div>
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                          <Link to={`/${props.movie.id}`}>{props.movie.title}</Link>
                        </Typography>
                        <div>
                          <div className='info'>
                            <span>{props.movie.releaseYear}</span>
                            <span>{props.movie.length} min</span>
                            <span>{props.movie.eirinCategory}</span>
                          </div>
                          <span className='genres'>{props.movie.genres.join(' ⬩ ')}</span>
                        </div>
                        <span>{props.movie.IMDB?.totalScore}/10</span>
                      </div>
                    </div>
                    <p>{props.movie.description}</p>
                    <div className='buttons'>
                      <button onClick={addToWatchlist}>+ Watchlist</button>
                      <button onClick={handleClose}>Close</button>
                    </div>
                    {watchlistMessage && <div className="message">{watchlistMessage}</div>} {/* Show the message */}
                  </StyledInfoDiv> :
                  props.movie && props.btnText === 'trailerIcon' ?
                    <>IFRAME FOR TRAILER HERE</> :
                    <p>Loading...</p>
            }
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default MuiModal;