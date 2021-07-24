import React, { useState, useEffect } from 'react';

export const SocketContext = React.createContext();

export function SocketProvider(props) {
    const [socket, setSocket] = useState(null);

    const handleSetSocket = (value) => {
        setSocket(value)
    }

    useEffect(() => {
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