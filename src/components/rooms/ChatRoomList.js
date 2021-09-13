import React from "react";
import { Nav } from "rsuite";
import RoomItem from "./RoomItem";

const ChatRoomList = ({ aboveElHeight }) => {
  return (
    <Nav
      appearance="subtle"
      vertical
      reversed
      className="overflow-y-scroll custom-scroll"
      style={{ height: `84%` }}
    >
      <Nav.Item>
        <RoomItem />
      </Nav.Item>
    </Nav>
  );
};

export default ChatRoomList;