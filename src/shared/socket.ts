import socketIOClient from 'socket.io-client';

const ENDPOINT = 'https://soujinko.shop';
const socket = socketIOClient(ENDPOINT);

export default socket;
