import socketIOClient from "socket.io-client";
import config from "../../config";


const io = socketIOClient(config.SERVE_URL, {transports: ['websocket']});


export default io;