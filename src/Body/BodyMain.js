import React, { useState, useEffect, useRef } from "react";
import "./BodyMain.css";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Message from "./Message";
import { useStateProviderValue } from "../StateProvider";
import db from "../firebase";
import firebase from "firebase";
import { Button } from "@material-ui/core";
import { auth } from "../firebase";
function BodyMain() {
  const [{ channel, server, user }] = useStateProviderValue();
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);

  const dummy = useRef();

  useEffect(() => {
    if (server && channel) {
      db.collection("servers")
        .doc(server.id)
        .collection("channels")
        .doc(channel.id)
        .collection("messages")
        .orderBy("timestamp")
        .onSnapshot((snapshot) => {
          setChats(
            snapshot.docs.map((doc) => {
              return {
                id: doc.id,
                message: doc.data().message,
                timestamp: doc.data().timestamp,
                user: doc.data().user,
              };
            })
          );
        });
    }
  }, [server, channel]);
  const updateMessage = async () => {
    if (message && server && channel) {
      await db
        .collection("servers")
        .doc(server.id)
        .collection("channels")
        .doc(channel.id)
        .collection("messages")
        .add({
          message: message,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          user: {
            name: user.displayName,
            photo: user.photoURL,
          },
        });
      setMessage("");
      dummy.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bodyMain">
      <div className="bodyMain_header">
        {channel ? (
          <>
            <span>#</span>
            <h1>{channel?.name}</h1>
          </>
        ) : (
          <>
            <span>Welcome to {server?.name}</span>
          </>
        )}
        {!server && (
          <>
            <span className="empty">Home</span>
            <Button
              className="logout"
              onClick={() => {
                auth.signOut();
              }}
            >
              Logout
            </Button>
          </>
        )}
      </div>
      <div className="bodyMain_contents">
        {channel &&
          chats &&
          chats.map((chat) => {
            return (
              <Message
                key={chat.id}
                message={chat.message}
                timestamp={chat.timestamp}
                user={chat.user}
              />
            );
          })}
        {!channel && (
          <div className="homeImg">
            <img
              src="https://www.rust-evolution.net/wp-content/uploads/2018/12/discord-icon-template-9.png"
              alt=""
            />
          </div>
        )}

        <div ref={dummy}></div>
      </div>

      {server && channel && (
        <div className="bodyMain_footer">
          <form>
            <AddCircleIcon fontSize="large" />
            <input
              disabled={!channel}
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              placeholder={`Message #${channel?.name}`}
            />
            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                updateMessage();
              }}
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default BodyMain;
