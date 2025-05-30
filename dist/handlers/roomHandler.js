"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const rooms = {};
const roomHandler = (socket) => {
    const createRoom = () => {
        const roomId = (0, uuid_1.v4)();
        socket.join(roomId);
        console.log("new room is created", roomId);
        socket.emit("room-created", { roomId });
        rooms[roomId] = [];
    };
    const joinedRoom = ({ roomId, peerId }) => {
        if (rooms[roomId]) {
            console.log("hello", peerId);
            console.log("New user joined a room", roomId, "with peerId", peerId);
            rooms[roomId].push(peerId);
            socket.join(roomId);
            socket.emit("get-users", {
                roomId,
                participants: rooms[roomId]
            });
            socket.on("ready", () => {
                console.log("emired ready");
                socket.to(roomId).emit("user-joined", { peerId });
            });
        }
    };
    socket.on("user-leave", ({ peerId, roomId }) => {
        console.log("call end", peerId);
        socket.to(roomId).emit("call-end", {
            peerId
        });
        console.log("disconneting guys");
        socket.emit("clear-my-peers");
    });
    socket.on("create-room", createRoom);
    socket.on("joined-room", joinedRoom);
};
exports.default = roomHandler;
