import React from "react";
import "./Body.css";
import BodySidebar from "./Body/BodySidebar";
import BodyMain from "./Body/BodyMain";
function Body() {
  return (
    <div className="body">
      {/* <h1>I am Body</h1> */}
      {/* sidebar */}
      <BodySidebar />
      {/* main */}
      <BodyMain />
    </div>
  );
}

export default Body;
