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

  useEffect(() => {
    socket = io("http://localhost:8000");
    if (socket) {
      socket.emit("setup", "user");
      socket.on("connected", () => {
        console.log("Connected from fronted");
        setSocketConnected(true);
      });
      console.log("sock " + socketConnected);
    }
  }, []);

  useEffect(() => {
    (async () => {
      const res = await axios.get(
        "http://localhost:8000/api/v1/chats/my-chats",
        {
          withCredentials: true,
        }
      );
      // res.data.chats
      console.log(res.data.chats);
      setExistingChats(res.data.chats.map((e) => e._id));
    })();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setFoundUsers(["User3", "User4"]);
  };

  // Function to handle selecting a user from the search results
  const handleUserSelect = (e) => {
    e.preventDefault();
    setSelectedUser("username");
    setFoundUsers([]); // Clear the search results after selecting a user
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    socket.emit("new message", messageInput);
    console.log(`Sending message to ${selectedUser}: ${messageInput}`);
    setMessageInput(""); // Clear the message input after sending
  };

  return (
    <div>
      {/* Section 1: Search for a user */}
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

      {/* Section 2: Chat box */}
      {selectedUser && (
        <div
          style={{
            border: "1px solid",
            padding: "10px",
            margin: "10px",
          }}
        >
          <div>
            {/* Display messages box here */}
            <div>
              <ul>
                {/* {foundUsers.map((user) => (
                  <li key={user}>
                    <a href="" onClick={handleUserSelect}>
                      {user}
                    </a>
                  </li>
                ))} */}
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

      {/* Section 3: Existing chats */}
      <div>
        <p>Existing Chats:</p>
        <ul>
          {existingChats.map((chatUser) => (
            <li key={chatUser}>
              <a href="" onClick={handleUserSelect}>
                {chatUser}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ChatPage;
