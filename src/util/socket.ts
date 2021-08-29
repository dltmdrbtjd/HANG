import io from 'socket.io-client';

const EndPoint = 'https://ruzan.shop';
export const socket = io(EndPoint, { transports: ['websocket'] });
