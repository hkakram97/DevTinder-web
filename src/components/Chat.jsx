import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((store) => store.user);
  const userId = user?._id;

  useEffect(() => {
    if (!userId) {
      return;
    }
    const socket = createSocketConnection();
    socket.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });

    socket.on("messageRecieved", ({ firstName, text }) => {
      console.log("Client", firstName, " ", text);
      setMessages((prev) => [...prev, { firstName, text }]);
    });
    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  const sendMessage = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: user.firstName,
      userId,
      targetUserId,
      text: newMessage,
    });
    setNewMessage("");
  };
  return (
    <div className="w-1/2 mx-auto border-gray-600 m-5 h-[70vh] flex flex-col bg-gray-700">
      <h1 className="p-5 border-b border-gray-600 text-white">Chat</h1>
      <div className="flex-1 overflow-scroll p-5">
        {messages?.map((msg, index) => {
          return (
            <div key={index}>
              <div className="chat-header">{msg.firstName}</div>
              <div className="chat chat-start">
                <div className="chat-bubble">{msg.text}</div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="p-5 border-t border-gray-600 flex items-center gap-2">
        <input
          className="flex-1 border-gray-600 text-black rounded"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button className="btn btn-secondary" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};
export default Chat;
