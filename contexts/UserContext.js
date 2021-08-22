import React, { useState, useEffect, useContext } from 'react'
import { SocketContext } from '@contexts/SocketContext';
import Cookie from "js-cookie";
import { useAuth } from "@contexts/AuthContext";

export const UserContext = React.createContext();

export function UserProvider({ children }) {
    const { socket } = useContext(SocketContext);
    const { setAuthenticated } = useAuth();
    const [user, setUser] = useState({
        id: '',
        name: '',
    });

    const handleSetUser = (user) => {
        setUser(user);
        Cookie.set("token", user.id, { expires: 7 });
        setAuthenticated(true);
        if (socket) {
            socket.emit('join', {
                userId: user.id,
                userName: user.name
            });
        }
    }

    return (
        <UserContext.Provider value={{
            user: user,
            handleSetUser: handleSetUser
        }}>
            {children}
        </UserContext.Provider>
    )
}