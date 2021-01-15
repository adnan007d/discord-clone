import { Avatar } from "@material-ui/core";
import React from "react";
import "./Message.css";

function Message({ message, timestamp, user }) {
  return (
    <div className="message">
      <Avatar src={user.photo} />
      <div className="message_info">
        <h4>
          {user.name}
          <span className="message_info_timestamp">
            {`${new Date(timestamp?.toDate()).toLocaleDateString()}`} &nbsp;
            &nbsp; {`${new Date(timestamp?.toDate()).toLocaleTimeString()}`}
          </span>
        </h4>
        <p>{message}</p>
      </div>
    </div>
  );
}

export default Message;
