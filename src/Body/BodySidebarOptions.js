import React from "react";
import "./BodySidebarOptions.css";
import { useStateProviderValue } from "../StateProvider";

function BodySidebarOptions({ id, channelName }) {
  const [{}, dispatch] = useStateProviderValue();

  const setChannel = (id, name) => {
    dispatch({
      type: "SET_CHANNEL",
      channel: {
        id: id,
        name: name,
      },
    });
  };

  return (
    <div
      className="bodySidebarOptions"
      onClick={() => {
        setChannel(id, channelName);
      }}
    >
      <h1>
        <span>#</span>
        {channelName}
      </h1>
    </div>
  );
}

export default BodySidebarOptions;
