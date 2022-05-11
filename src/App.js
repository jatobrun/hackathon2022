import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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

let roomCode = '';

function App() {
  const valueRef = useRef('') 
  const dispatch = useDispatch();

  const [openCreateRoomModal, setOpenCreateRoomModal] = React.useState(false);
  const [openEnterRoomModal, setOpenEnterRoomModal] = React.useState(false);
  const [btnDisabled, setBtnDisabled] = React.useState(true)

  const [hasRender, setRender] = React.useState(false);

  const handleOpenCreateRoomModal = () => setOpenCreateRoomModal(true);
  const handleCloseCreateRoomModal = () => setOpenCreateRoomModal(false);
  const handleOpenEnterRoomModal = () => setOpenEnterRoomModal(true);
  const handleCloseEnterRoomModal = () =>{
    setOpenEnterRoomModal(false);
    setBtnDisabled(true);
  } 

  

  const handleStartRoom = (code) => {    
    console.log(code)
    dispatch(
      actions.enterRoom(code, {
        todos: [],
      }));
      // setOpenCreateRoomModal(false)
      // setOpenEnterRoomModal(false)
      setRender(true)
  };

  const generateRandomCode = () => {
    var firstPart = (Math.random() * 46656) | 0;
    var secondPart = (Math.random() * 46656) | 0;
    firstPart = ("000" + firstPart.toString(36)).slice(-3).toUpperCase();
    secondPart = ("000" + secondPart.toString(36)).slice(-3).toUpperCase();
    roomCode = firstPart + secondPart
    return roomCode;
  };

  const handleLeaveRoom = () => {
    const code = btnDisabled ? roomCode : valueRef.current.value
    dispatch(
      actions.leaveRoom(code));
  }
  
  const othersUsersCount = useSelector(
    (state) => {
      console.log(state.liveblocks.others);
      return state.liveblocks.others.length;
    }
  );
  useEffect(() => {}, [dispatch]);
  
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
                <TextField onChange={(text) => setBtnDisabled(!(text.target.value.length === 6))} id="filled-basic" label="Enter Room Code" variant="filled" inputRef={valueRef} />
              </div>
              <Button disabled={btnDisabled} onClick={() => handleStartRoom(valueRef.current.value)}>JOIN</Button>          
            </Box>
          </Modal>
        </div>
      }
      {hasRender && 
        <div className="who_is_here">
          There are {othersUsersCount} other users online

          <p>{roomCode}</p>
          <Button onClick={handleLeaveRoom()}>Leave Room</Button>
        </div> }
    </div>
  );
}

export default App;
