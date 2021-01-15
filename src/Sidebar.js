import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import "./Sidebar/SidebarOptions";
import SidebarOptions from "./Sidebar/SidebarOptions";
import AddIcon from "@material-ui/icons/Add";
import db from "./firebase";

function Sidebar() {
  const [servers, setServers] = useState([]);

  useEffect(() => {
    db.collection("servers").onSnapshot((snapshot) => {
      setServers(
        snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            name: doc.data().name,
          };
        })
      );
    });
  }, []);

  const addServer = () => {
    const serverName = prompt("Enter the name for server");
    db.collection("servers").add({
      name: serverName,
    });
  };

  return (
    <div className="sidebar">
      <SidebarOptions name="Home" />
      <hr />
      {servers.map((server) => {
        return (
          <SidebarOptions key={server.id} id={server.id} name={server.name} />
        );
      })}
      <div className="sidebarOptions_addicon">
        <span></span>
        <AddIcon onClick={addServer} fontSize="large" />
      </div>
    </div>
  );
}

export default Sidebar;
