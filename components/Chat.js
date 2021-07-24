import react, { useState, useEffect, useContext } from 'react';
import socketio from 'socket.io-client';
import { SocketContext } from '../contexts/SocketContext';
import { UserContext } from '../contexts/UserContext';

const endpoint = 'http://localhost:5000';

function Chat() {
    const { socket, handleSetSocket } = useContext(SocketContext);
    const { user } = useContext(UserContext);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (!socket) {
            const socket_connect = socketio(endpoint);
            
            socket_connect.on('message', message => {
                setMessages(messages => [...messages, message]);
            });
            handleSetSocket(socket_connect);
        }
    }, []);

    const handleClickSend = (event) => {
        event.preventDefault();
        if (message) {
            const mymessage = {
                message,
                from: user.name,
            }
            socket.emit('message', mymessage);
            setMessages(messages => [...messages, mymessage]);
        }
    }

    return (
        <div>
            <form onSubmit={handleClickSend}>

                <input value={message} onChange={(e) => setMessage(e.target.value)} />
                <button type="submit">Send</button>
            </form>
            <div>
                {messages.map((item, index) => {
                    return (
                        <p key={index}>{item.from}: {item.message}</p>
                    )
                })}
            </div>
        </div>
    )
}

export default Chat