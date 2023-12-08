import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import io from "socket.io-client";

function Home() {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100vh",
        }}
      >
        <h1>welcome to ctrl-alt-defeat clinic, Guest!</h1>
        <Link to="/patients/register">register as patient</Link>
        <Link to="/doctors/register">register as doctor</Link>
        <Link to="/login">login</Link>
      </div>
    </>
  );
}

export default Home;
