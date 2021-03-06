import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "@liveblocks/redux";

import { setDraft, addTodo, deleteTodo } from "./config/store";

import './App.css';
import { Button, Modal, Box, Typography, TextField } from '@mui/material';

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

function SomeoneIsTyping() {
  const someoneIsTyping = useSelector((state) =>
    state.liveblocks.others.some((user) => user.presence?.isTyping)
  );

  return someoneIsTyping ? (
    <div className="someone_is_typing">Someone is typing...</div>
  ) : null;
}

function App() {
  const valueRef = useRef('');

  const todos = useSelector((state) => state.todos);
  const draft = useSelector((state) => state.draft);

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
    roomCode = code; // This is because the roomCode could be enter in the imput or just generate for generateRandomCode()
    dispatch(
      actions.enterRoom(code, {
        todos: [],
    }));
    
    setOpenCreateRoomModal(false);
    setOpenEnterRoomModal(false);
    setRender(true);
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
    dispatch(
      actions.leaveRoom(roomCode)
    );
    setRender(false);
    roomCode = '';
  }
  
  const othersUsersCount = useSelector(
    (state) => {
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
        <div className="container">
           <div className="who_is_here">
              There are {othersUsersCount} other users online
            </div>

          <p>{roomCode}</p>
          <Button onClick={() => handleLeaveRoom()}>Leave Room</Button>

          <div>
            <TextField 
              variant="filled"
              className="input"
              type="text"
              placeholder="What needs to be done?"
              value={draft}
              onChange={(e) => dispatch(setDraft(e.target.value))}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  dispatch(addTodo());
                }
              }}
            />
            <SomeoneIsTyping />
            {todos.map((todo, index) => {
              return (
                <div className="todo_container" key={index}>
                  <label className="todo">{todo.text}</label>
                  <button
                    className="delete_button"
                    onClick={() => dispatch(deleteTodo(index))}
                  >
                    ???
                  </button>
                </div>
              );
            })}
          </div>
        </div> }
    </div>
  );
}

export default App;
