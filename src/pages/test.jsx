import React, { useState, useEffect } from "react";
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const ChatApp = () => {
  const [stompClient, setStompClient] = useState(null);
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  // Kết nối WebSocket khi component được mount
  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/ws");
    const client = Stomp.over(socket);

    // Lấy token từ localStorage nếu có
    const token = localStorage.getItem('token');

    client.connect(
      { Authorization: `Bearer ${token}` }, // Gửi token khi kết nối nếu có
      () => {
        console.log("WebSocket connected!");

        // Subscribe to /topic/public
        client.subscribe("/topic/public", (payload) => {
          const newMessage = JSON.parse(payload.body);
          setMessages((prevMessages) => [...prevMessages, newMessage]);
        });
      },
      (error) => {
        console.error("WebSocket connection failed:", error);
      }
    );

    setStompClient(client);

    // Cleanup connection khi component unmount
    return () => {
      if (client) client.disconnect();
    };
  }, []);

  // Gửi tin nhắn
  const sendMessage = () => {
    if (stompClient && message.trim()) {
      const chatMessage = {
        sender: username || "Anonymous",
        content: message,
        type: "CHAT",
      };
      stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(chatMessage));
      setMessage(""); // Clear message input
    }
  };

  // Thêm user vào phòng chat
  const addUser = () => {
    if (stompClient && username.trim()) {
      const chatMessage = {
        sender: username,
        type: "JOIN",
      };
      stompClient.send("/app/chat.addUser", {}, JSON.stringify(chatMessage));
      console.log(`${username} joined the chat`); // Thêm thông báo khi người dùng tham gia
    }
  };

  // Hiển thị các tin nhắn chat
  useEffect(() => {
    const chatBox = document.querySelector("div[style*='overflowY: scroll']");
    if (chatBox) chatBox.scrollTop = chatBox.scrollHeight; // Cuộn xuống dưới khi có tin nhắn mới
  }, [messages]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Chat Application</h1>

      {/* Nếu chưa có username, hiển thị input để nhập */}
      {!username ? (
        <div>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button onClick={addUser}>Join Chat</button>
        </div>
      ) : (
        // Hiển thị UI chat nếu đã có username
        <div>
          <div style={{ border: "1px solid #ccc", padding: "10px", height: "300px", overflowY: "scroll" }}>
            {messages.map((msg, index) => (
              <div key={index}>
                {msg.type === "CHAT" && (
                  <div>
                    <strong style={{ color: "#007BFF" }}>{msg.sender}</strong>: {msg.content}
                  </div>
                )}
                {msg.type === "JOIN" && <div><em>{msg.sender} joined the chat</em></div>}
                {msg.type === "LEAVE" && <div><em>{msg.sender} left the chat</em></div>}
              </div>
            ))}
          </div>
          <input
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      )}
    </div>
  );
};

export default ChatApp;
