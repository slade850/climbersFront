import socketIOClient from "socket.io-client";
import config from "../../config";


/* const io = (token) => socketIOClient(config.SERVE_URL, {transports: ['websocket'], query: `token=${token}` }); */
const io = socketIOClient(config.SERVE_URL, {transports: ['websocket']});

export default io;