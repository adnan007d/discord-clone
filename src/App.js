import "./App.css";
import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import Body from "./Body";
import { useStateProviderValue } from "./StateProvider";
import Login from "./Login";
import { auth } from "./firebase";
function App() {
  const [{ user }, dispatch] = useStateProviderValue();
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, [dispatch]);

  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <>
          <Sidebar />
          <Body />
        </>
      )}
    </div>
  );
}

export default App;
