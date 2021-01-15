import React from "react";
import "./SidebarOptions.css";
import Avatar from "@material-ui/core/Avatar";
import { useStateProviderValue } from "../StateProvider";

function SidebarOptions({ id, name }) {
  const [{ server }, dispatch] = useStateProviderValue();

  const setServer = (id, name) => {
    if (id && name) {
      dispatch({
        type: "SET_SERVER",
        server: {
          id: id,
          name: name,
        },
      });
      dispatch({
        type: "SET_CHANNEL",
        channel: null,
      });
    } else {
      dispatch({
        type: "SET_SERVER",
        server: null,
      });
      dispatch({
        type: "SET_CHANNEL",
        channel: null,
      });
    }
  };

  return (
    <div className="sidebarOptions">
      <div className="sidebarOptions_contents">
        <span
          className={`sidebarOptions_bar ${server?.id === id ? "show" : ""}`}
        ></span>
        <Avatar
          onClick={() => {
            setServer(id, name);
          }}
          src="https://helloacm.com/wp-content/uploads/2018/03/discord.jpg"
          fontSize="large"
          className={`sidebarOptions_icon ${server?.id === id ? "active" : ""}`}
        />
        <span className="tooltip">{name}</span>
      </div>
    </div>
  );
}

export default SidebarOptions;
