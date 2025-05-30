"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const serverConfig_1 = require("./config/serverConfig");
const cors_1 = __importDefault(require("cors"));
const socket_io_1 = require("socket.io");
const roomHandler_1 = __importDefault(require("./handlers/roomHandler"));
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
app.use((0, cors_1.default)());
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});
io.on("connection", (socket) => {
    console.log("new user is connected");
    (0, roomHandler_1.default)(socket);
    socket.on("disconnect", () => {
        console.log("user disconnected having socket id =>", socket.id);
    });
});
server.listen(serverConfig_1.PORT, () => {
    console.log(`server started at ${serverConfig_1.PORT}`);
});
