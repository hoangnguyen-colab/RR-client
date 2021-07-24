import React, { useState, useEffect } from 'react'
export const UserContext = React.createContext();

export function UserProvider({ children }) {
    const [user, setUser] = useState({
        id: '',
        name: '',
    });

    const handleSetUser = (user) => {
        setUser(user);
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