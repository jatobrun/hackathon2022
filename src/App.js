import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { actions } from "@liveblocks/redux";

import CodeView from "./components/CodeView/CodeView";

import './App.css';
import {Button, Modal, Box, Typography, TextField} from '@mui/material';

const style = {
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

function App() {
  const valueRef = useRef('') 
  const dispatch = useDispatch();

  const [openCreateRoomModal, setOpenCreateRoomModal] = React.useState(false);
  const [openEnterRoomModal, setOpenEnterRoomModal] = React.useState(false);

  const [hasRender, setRender] = React.useState(false);

  const handleOpenCreateRoomModal = () => setOpenCreateRoomModal(true);
  const handleCloseCreateRoomModal = () => setOpenCreateRoomModal(false);
  const handleOpenEnterRoomModal = () => setOpenEnterRoomModal(true);
  const handleCloseEnterRoomModal = () => setOpenEnterRoomModal(false);

  const setRenderComponent = () => { 
    setOpenEnterRoomModal(false);
    setRender(true);
  };
        
  const handleStartRoom = (code) => {    
    dispatch(
      actions.enterRoom(code, {
        todos: [],
      }));
      setOpenCreateRoomModal(false)
      setOpenEnterRoomModal(false)
  };

  let roomCode = '';
  const generateRandomCode = () => {
    var firstPart = (Math.random() * 46656) | 0;
    var secondPart = (Math.random() * 46656) | 0;
    firstPart = ("000" + firstPart.toString(36)).slice(-3).toUpperCase();
    secondPart = ("000" + secondPart.toString(36)).slice(-3).toUpperCase();
    roomCode = firstPart + secondPart
    return roomCode;
  };

  return (
    <div>
      { !hasRender &&       
        <div>
          <Typography id="modal-modal-title" variant="h6" component="h2">
              Main Page
          </Typography>
          <Button onClick={handleOpenCreateRoomModal}>Create Room</Button>
          <Modal
            open={openCreateRoomModal}
            onClose={handleCloseCreateRoomModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Create room
              </Typography>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                {generateRandomCode()}
              </Typography>
              <Button onClick={() => handleStartRoom(roomCode)}>START</Button>
            </Box>
          </Modal>

          <Button onClick={handleOpenEnterRoomModal}>Enter Room</Button>
          <Modal
            open={openEnterRoomModal}
            onClose={handleCloseEnterRoomModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Get Room Code
              </Typography>
              <div>
                <TextField id="filled-basic" label="Enter Room Code" variant="filled" inputRef={valueRef} />
              </div>
              <Button onClick={() => setRenderComponent()}>JOIN</Button>          
            </Box>
          </Modal>
        </div>
      }

      {hasRender && <CodeView code={valueRef.current.value}/>}
    </div>
  );
}

export default App;
