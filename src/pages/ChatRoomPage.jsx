import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { getChatMessages, sendMessage } from "../services/api";

function ChatRoomPage() {
  const { chatId } = useParams();

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [sending, setSending] = useState(false);

  const bottomRef = useRef(null);

  // Cargar mensajes al entrar al chat
  useEffect(() => {
    if (!chatId) return;

    getChatMessages(chatId)
      .then((data) => setMessages(data))
      .catch((err) => console.log(err));
  }, [chatId]);

  // Scroll automático al último mensaje
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (!newMessage.trim() || sending) return;

    setSending(true);

    sendMessage(chatId, newMessage)
      .then((createdMessage) => {
        setMessages((prev) => [...prev, createdMessage]);
        setNewMessage("");
      })
      .catch((err) => console.log(err))
      .finally(() => setSending(false));
  };

  return (
    <div>
      <h2>Chat</h2>

      <div style={{ maxHeight: "400px", overflowY: "auto", marginBottom: "10px" }}>
        {messages.map((msg) => (
          <div key={msg._id}>
            <strong>{msg.sender?.name || "User"}: </strong>
            <span>{msg.text}</span>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={handleSendMessage}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Escribe un mensaje..."
        />
        <button type="submit" disabled={sending}>
          {sending ? "Enviando..." : "Enviar"}
        </button>
      </form>
    </div>
  );
}

export default ChatRoomPage;