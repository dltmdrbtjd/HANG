import React from 'react';
import { io } from 'socket.io-client';

export const socket = io(`https://ruzan.shop`);
export const SocketContext = React.createContext(socket);