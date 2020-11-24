import socketIOClient from 'socket.io-client';
const isDev = process.env.NODE_ENV === 'development';

const ENDPOINT = 'http://localhost:8080/';

const socketIo = isDev ? socketIOClient(ENDPOINT) : socketIOClient();

export default socketIo;
