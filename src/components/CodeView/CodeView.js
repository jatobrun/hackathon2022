import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "@liveblocks/redux";

import {Button} from '@mui/material';


function CodeView(props) {
  console.log(props)
  
  const dispatch = useDispatch();
  const handleLeaveRoom = () => {
    console.log(props.code)
    dispatch(
      actions.leaveRoom(props.code));
  }
  
  const othersUsersCount = useSelector(
    (state) => {
      console.log(state.liveblocks.others);
      return state.liveblocks.others.length;
    }
  );
  return (
    <div className="who_is_here">
      There are {othersUsersCount} other users online
      <Button onClick={handleLeaveRoom()}>Leave Room</Button>
    </div>
   );
 };

export default CodeView;
