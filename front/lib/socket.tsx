import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";

const CHAT_MESSAGE_EVENT = "chat-msg";
const SOCKET_SERVER_URL = "http://localhost:3001";

const useChat = (roomId: string, username: string): any => {
    const [messages, setMessages] = useState([]);
    const socketRef = useRef<any>();

    useEffect(() => {
        socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
            query: { roomId },
        });

        // Listens for incoming messages
        socketRef.current.on("history", (messages) => {
            if (!messages) return;
            setMessages(
                messages.map((msg) => ({
                    ...msg,
                    ownedByCurrentUser: msg.body.username === username,
                })),
            );
        });

        socketRef.current.on(CHAT_MESSAGE_EVENT, (message) => {
            const incomingMessage = {
                ...message,
                ownedByCurrentUser: message.body.username === username,
            };
            setMessages((messages) => [...messages, incomingMessage]);
        });

        // Destroys the socket reference
        // when the connection is closed
        return () => {
            socketRef.current.disconnect();
        };
    }, [roomId]);

    const sendMessage = (messageBody: string, image?: string) => {
        socketRef.current.emit(CHAT_MESSAGE_EVENT, {
            body: { message: messageBody, username, image },
            senderId: socketRef.current.id,
        });
    };

    return { messages, sendMessage };
};

export default useChat;
