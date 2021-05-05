import { createServer } from "http";
import { Server } from "socket.io";

import { loadHistory, writeistory } from "./lib/history";

const history = loadHistory();

const server = createServer();
const io = new Server(server, {
    cors: {
        origin: "*",
    },
});

const PORT = 3001;
const CHAT_MESSAGE_EVENT = "chat-msg";

io.on("connection", (socket) => {
    const { roomId }: { roomId: string } = socket.handshake.query;
    socket.join(roomId);

    io.to(socket.id).emit("history", history[roomId]);

    // Listen for new messages
    socket.on(CHAT_MESSAGE_EVENT, (data) => {
        io.in(roomId).emit(CHAT_MESSAGE_EVENT, data);
        if (!history[roomId]) {
            history[roomId] = [];
        }
        history[roomId].push(data);
        writeistory(history);
    });

    // Leave the room if the user closes the socket
    socket.on("disconnect", () => {
        socket.leave(roomId);
    });
});

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
