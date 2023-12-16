import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";
let socket;
const ChatPage = () => {
  const [searchUsername, setSearchUsername] = useState("");
  const [foundUsers, setFoundUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messageInput, setMessageInput] = useState("");
  const [existingChats, setExistingChats] = useState(["User1", "User2"]);
  const [socketConnected, setSocketConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [loggedIn, setLoggedIn] = useState({});
  const [chatId, setChatId] = useState(null);

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
    }
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setFoundUsers(["User3", "User4"]);
  };

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
    <div>
      <div>
        <input
          type="text"
          placeholder="Search for a username"
          value={searchUsername}
          onChange={(e) => setSearchUsername(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        {foundUsers.length > 0 && (
          <ul>
            {foundUsers.map((user) => (
              <li key={user}>
                <a href="" onClick={handleUserSelect}>
                  {user}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>

      {selectedUser && (
        <div
          style={{
            border: "1px solid",
            padding: "10px",
            margin: "10px",
          }}
        >
          <div>
            <div
              style={{
                height: "200px",
                overflowY: "scroll",
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
          </div>
          <input
            type="text"
            placeholder="Type your message"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      )}

      <div>
        <p>Existing Chats:</p>
        <ul>
          {existingChats.map((chatUser) => (
            <li key={chatUser}>
              <a
                key={chatUser._id}
                href=""
                onClick={(e) => handleUserSelect(e, chatUser._id)}
              >
                {getUserName(chatUser)}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ChatPage;
