import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";
import {
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  TextField,
  Typography,
  Dialog,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import { VideoCall } from "@mui/icons-material";
let socket;
const ChatPage = () => {
  //   const [searchUsername, setSearchUsername] = useState("");
  const [foundUsers, setFoundUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messageInput, setMessageInput] = useState("");
  const [existingChats, setExistingChats] = useState(["User1", "User2"]);
  const [socketConnected, setSocketConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [loggedIn, setLoggedIn] = useState({});
  const [chatId, setChatId] = useState(null);
  const [callLink, setCallLink] = useState(null);
  const [callDialogueOpen, setCallDialogueOpen] = useState(false);

  useEffect(() => {
    (async () => {
      const resp = await axios.get("http://localhost:8000/api/v1/auth/getMe", {
        withCredentials: true,
      });
      console.log(resp.data.loggedIn);
      setLoggedIn(resp.data.loggedIn);
      const res = await axios.get(
        "http://localhost:8000/api/v1/chats/my-chats",
        {
          withCredentials: true,
        }
      );
      console.log(res.data.chats);
      setExistingChats(res.data.chats);
    })();
  }, []);
  const getUserName = (e) => {
    if (loggedIn.username === e.patient) return e.doctor;
    else return e.patient;
  };
  useEffect(() => {
    socket = io("http://localhost:8000");
    if (socket) {
      socket.emit("setup", "user");
      socket.on("connected", () => {
        console.log("Connected from fronted");
        setSocketConnected(true);
      });
      console.log("sock " + socketConnected);

      socket.on("message recieved", (newMessageRecieved) => {
        if (newMessageRecieved.sender != loggedIn.username) {
          console.log("logged in user that receives: " + loggedIn.username);
          setMessages((messages) => [...messages, newMessageRecieved]);
        }
      });

      socket.on("callUser", (link) => {
        setCallLink(link);
        setCallDialogueOpen(true);
      });
    }
  }, []);

  const callUser = () => {};

  const handleUserSelect = async (e, id) => {
    e.preventDefault();
    console.log("e.target.key: " + id);
    socket.emit("join chat", { username: loggedIn.username, chat: id });
    setChatId(id);
    const res = await axios.get("http://localhost:8000/api/v1/chats/" + id, {
      withCredentials: true,
    });
    console.log(res.data);
    setMessages(res.data.messages);
    setSelectedUser("username");
    setFoundUsers([]);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    const res = await axios.post(
      "http://localhost:8000/api/v1/chats/send-message",
      {
        content: messageInput,
        chatId: chatId,
      },
      {
        withCredentials: true,
      }
    );
    socket.emit("new message", {
      msg: res.data.messageSent,
      loggedIn: loggedIn,
    });
    setMessages((messages) => [...messages, res.data.messageSent]);
    console.log(`Sending message to ${selectedUser}: ${messageInput}`);
    setMessageInput("");
  };

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            border: "1px solid lightgray",
            padding: "10px",
            margin: "10px",
            borderRadius: "5px",
            width: "30%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h6">Existing Chats:</Typography>
          <hr />
          <ul>
            {existingChats.map((chatUser) => (
              <List>
                {existingChats.map((chatUser) => (
                  <ListItem key={chatUser._id}>
                    <Button
                      onClick={(e) => {
                        handleUserSelect(e, chatUser._id);
                      }}
                    >
                      {getUserName(chatUser)}
                    </Button>
                  </ListItem>
                ))}
              </List>
            ))}
          </ul>
        </div>
        {selectedUser && (
          <div
            style={{
              border: "1px solid lightgray",
              padding: "10px",
              margin: "10px",
              borderRadius: "5px",
              width: "70%",
              height: "100%",
            }}
          >
            <div
              style={{
                height: "200px",
                overflowY: "scroll",
                height: "90%",
                width: "100%",
              }}
            >
              <ul>
                {messages.map((m) => (
                  <li
                    key={m._id}
                    style={{
                      textAlign:
                        m.sender == loggedIn.username ? "right" : "left",
                    }}
                  >
                    {m.sender == loggedIn.username
                      ? `${m.sender}: ` + m.content
                      : `not me: ` + m.content}
                  </li>
                ))}
              </ul>
            </div>
            <div
              style={{
                width: "100%",
                height: "10%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TextField
                type="text"
                placeholder="Type your message"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                fullWidth
              />
              <Button variant="text" onClick={handleSendMessage}>
                Send
              </Button>
              <IconButton color="primary">
                <VideoCall />
              </IconButton>
            </div>
          </div>
        )}
        <Dialog
          open={callDialogueOpen}
          onClose={() => setCallDialogueOpen(false)}
          maxWidth="md"
        >
          <DialogTitle>a call</DialogTitle>
          <DialogActions>
            <Button
              onClick={() => setCallDialogueOpen(false)}
              variant="text"
              color="primary"
            >
              reject
            </Button>
            <Button onClick={() => {}} variant="text" color="primary">
              answer
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </div>
  );
};

export default ChatPage;
