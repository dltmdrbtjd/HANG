import io from 'socket.io-client';

const EndPoint = 'https://soujinko.shop';
export const socket = io(EndPoint);
