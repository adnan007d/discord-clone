import React from "react";
import { Button } from "@material-ui/core";
import "./Login.css";
import { auth, provider } from "./firebase";

function Login() {
  const handleLogin = () => {
    auth.signInWithPopup(provider).catch((error) => {
      alert(error);
    });
  };

  return (
    <div className="login">
      <img
        src="https://cdn0.iconfinder.com/data/icons/free-social-media-set/24/discord-512.png"
        alt="discord Icon"
      />
      <Button className="login_button" onClick={handleLogin}>
        Sign in With Google
      </Button>
    </div>
  );
}

export default Login;
