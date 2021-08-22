import React, { useState, useEffect } from 'react';
import socketio from 'socket.io-client';

export const SocketContext = React.createContext();

// const endpoint = 'http://localhost:5000';
const endpoint = 'https://rr-chat-server.herokuapp.com';
export const socket = socketio.connect(endpoint);

export function SocketProvider(props) {

    const handleSetSocket = (value) => {
        setSocket(value)
    }

    useEffect(() => {
        return () => {
            if(socket) {
                socket.emit('disconnect');
                socket.off();
            }
        }
    }, [])

    return (
        <SocketContext.Provider
            value={{
                handleSetSocket: handleSetSocket,
                socket: socket,
            }}
        >
            {props.children}
        </SocketContext.Provider>
    )
}

export default SocketContext;