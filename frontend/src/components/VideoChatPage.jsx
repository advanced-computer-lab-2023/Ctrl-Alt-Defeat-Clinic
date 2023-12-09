import React, { useEffect, useRef, useState } from "react";
import Peer from "simple-peer";
import io from "socket.io-client";
import axios from "axios";

const socket = io.connect("http://localhost:8000");
function VideoChatPage() {
  const [me, setMe] = useState(null);
  const [stream, setStream] = useState();
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);
  const [usernameToCall, setUsernameToCall] = useState("");
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState("");
  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
        myVideo.current.srcObject = stream;
      });

    (async () => {
      const resp = await axios.get("http://localhost:8000/api/v1/auth/getMe", {
        withCredentials: true,
      });
      console.log(resp.data.loggedIn);
      //   setMe(resp.data.loggedIn);
    })();

    socket.on("me", (id) => {
      setMe(id);
    });

    // socket.emit("join chat", { username: loggedIn.username, chat: id });

    socket.on("callUser", (data) => {
      console.log("inside callUser emition");
      setReceivingCall(true);
      setCaller(data.from);
      setName(data.name);
      setCallerSignal(data.signal);
    });
  }, []);

  const callUser = (id) => {
    // console.log("Calling " + id);
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });

    peer.on("signal", (data) => {
      console.log({
        userToCall: id,
        signalData: data,
        from: me,
        name: "test",
      });
      socket.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: me,
        to: id,
        name: name,
      });
    });
    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });
    socket.on("callAccepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const answerCall = () => {
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: caller });
    });
    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });

    peer.signal(callerSignal);
    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current.destroy();
  };
  return (
    <div>
      {me && <p>socketId = {me}</p>}
      {callAccepted && !callEnded ? (
        <button onClick={leaveCall}>end</button>
      ) : (
        <div>
          <input
            type="text"
            placeholder="username to call"
            value={usernameToCall}
            onChange={(e) => setUsernameToCall(e.target.value)}
          />
          <button onClick={() => callUser(usernameToCall)}>call</button>
        </div>
      )}
      <div>
        {stream && (
          <video
            playsInline
            muted
            ref={myVideo}
            autoPlay
            style={{ width: "300px" }}
          />
        )}
      </div>
      <div>
        {callAccepted && !callEnded ? (
          <video
            playsInline
            ref={userVideo}
            autoPlay
            style={{ width: "300px" }}
          />
        ) : null}
      </div>
      <div>
        {receivingCall && !callAccepted ? (
          <div className="caller">
            <h1>{name} is calling...</h1>
            <button onClick={answerCall}>answer</button>
            {/* <Button variant="contained" color="primary" onClick={answerCall}>
              Answer
            </Button> */}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default VideoChatPage;
