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

type Props = {
  btnText: string,
  name: string,
  type: string,
  function: () => void,
  movie: Movie
}

const style = {
  color: 'black',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const StyledInfoDiv = styled.div`
  > img{
    width: 100px;
    height: 100px;
  }
`;

const MuiModal = ( props : Props) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
              props.movie ?
              <StyledInfoDiv>
                <img src={props.movie.photos.poster[0]} alt={props.movie.title} />
                <Typography id="transition-modal-title" variant="h6" component="h2">
                  {props.movie.title}
                </Typography>
                <div>
                  <span>{props.movie.releaseYear}</span>
                  <span>{props.movie.length}</span>
                  <span>{props.movie.eirinCategory}</span>
                  <span>{props.movie.genres.toString()}</span>
                </div>
                <div>
                  <span>{props.movie.IMDB?.totalScore}/10</span>
                </div>
                <p>{props.movie.description}</p>
                <div>
                  <button>+ Watchlist</button>
                  <button onClick={handleClose}>Close</button>
                </div>
              </StyledInfoDiv> :
              <p>Loading...</p>
            }
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default MuiModal;