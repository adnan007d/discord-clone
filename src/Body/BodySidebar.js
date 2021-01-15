import React, { useState, useEffect } from "react";
import "./BodySidebar.css";
import BodySidebarOptions from "./BodySidebarOptions";
import Avatar from "@material-ui/core/Avatar";
import FiberManualRecordSharpIcon from "@material-ui/icons/FiberManualRecordSharp";
import AddIcon from "@material-ui/icons/Add";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useStateProviderValue } from "../StateProvider";
import db from "../firebase";

function BodySidebar() {
  const [showOptions, setShowOptions] = useState(true);
  const [{ user, server }] = useStateProviderValue();
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    if (server) {
      db.collection("servers")
        .doc(server.id)
        .collection("channels")
        .onSnapshot((snapshot) => {
          setChannels(
            snapshot.docs.map((doc) => {
              return {
                id: doc.id,
                name: doc.data().name,
              };
            })
          );
        });
    }
  }, [server]);

  const addChannel = () => {
    const channelName = prompt("Enter a channel name");
    if (channelName) {
      db.collection("servers").doc(server.id).collection("channels").add({
        name: channelName,
      });
    }
  };

  return (
    <div className="bodySidebar">
      <div className="bodySidebar_header">
        <h1>{server?.name}</h1>
      </div>
      <div className="bodySidebar_options">
        {server && (
          <div className="bodySidebar_options_addChannel">
            <div
              className="bodySidebar_options_addChannel_left"
              onClick={() => {
                setShowOptions(!showOptions);
              }}
            >
              {showOptions ? <ExpandMoreIcon /> : <ChevronRightIcon />}
              <h5>TEXT CHANNELS</h5>
            </div>
            <AddIcon onClick={addChannel} />
          </div>
        )}
        {showOptions && (
          <>
            {server &&
              channels.map((channel) => {
                return (
                  <BodySidebarOptions
                    key={channel.id}
                    id={channel.id}
                    channelName={channel.name}
                  />
                );
              })}
          </>
        )}
      </div>
      <div className="bodySidebar_footer">
        <div className="bodySidebar_footer_icons">
          <Avatar src={user?.photoURL} />
          <FiberManualRecordSharpIcon />
        </div>
        <span>{user?.displayName}</span>
      </div>
    </div>
  );
}

export default BodySidebar;
