import react, { useState, useEffect, useContext, useRef } from 'react';
import socketio from 'socket.io-client';
import { SocketContext } from '../contexts/SocketContext';
import { UserContext } from '../contexts/UserContext';
import UserMessage from './ChatMessage/UserMessage';
import GuestMessage from './ChatMessage/GuestMessage';

const endpoint = 'http://localhost:5000';
// const endpoint = 'https://rr-chat-server.herokuapp.com';

function Chat() {
    const { socket, handleSetSocket } = useContext(SocketContext);
    const { user } = useContext(UserContext);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const messagesEndRef = useRef(null)

    useEffect(() => {
        if (!socket) {
            const socket_connect = socketio(endpoint);
            socket_connect.emit('join', {
                userName: user.name
            });

            socket_connect.on('join', userName => {
                setMessages(messages => [...messages, userName]);
            });

            socket_connect.on('message', message => {
                setMessages(messages => [...messages, message]);
            });
            handleSetSocket(socket_connect);
        }
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleClickSend = (event) => {
        event.preventDefault();
        if (message) {
            const mymessage = {
                message,
                userId: user.id,
                senderName: user.name,
                messageId: Date.now(),
                date: Date.now()
            }
            socket.emit('message', mymessage);
            setMessages(messages => [...messages, mymessage]);
        }
    }

    return (
        <div style={styles.chat}>
            <div style={styles.chatHistory}>
                <ul style={{ listStyleType: 'none' }}>
                    {messages.map((item, index) => {
                        if(!item.messageId){
                            return <li style={{
                                // position: 'absolute',
                                color: 'gray',
                                textAlign: 'center',
                                marginLeft: '-20px',
                            }}>{item} has join</li>
                        }
                        if (item.userId === user.id) {
                            return <UserMessage key={item.messageId} message={item} />
                        } else {
                            return <GuestMessage key={item.messageId} message={item} />
                        }
                    })}
                   
                    <li ref={messagesEndRef}></li>
                </ul>
            </div>

            <form onSubmit={handleClickSend}>
                <input value={message} onChange={(e) => setMessage(e.target.value)} />
                <button type="submit">Send</button>
            </form>
        </div>
    )
}

export default Chat;

const styles = {
    chat: {
        width: '490px',
        float: 'left',
        background: '#F2F5F8',
        borderTopRightRadius: '5px',
        borderBottomRightRadius: '5px',
        color: '#434651',
        paddingBottom: '20px',
    },
    chatHistory: {
        padding: '30px 10px 20px',
        borderBottom: '2px solid white',
        overflowY: 'scroll',
        height: '80vh',
    }
}