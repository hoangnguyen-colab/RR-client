import react, { useState, useEffect, useContext, useRef } from 'react';
import { SocketContext } from '@contexts/SocketContext';
import { UserContext } from '@contexts/UserContext';
import UserMessage from './ChatMessage/UserMessage';
import GuestMessage from './ChatMessage/GuestMessage';

function Chat() {
    const { socket } = useContext(SocketContext);
    const { user } = useContext(UserContext);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const messagesEndRef = useRef(null)

    useEffect(() => {
        if (socket) {
            // socket_connect.on('join', userName => {
            //     setMessages(messages => [...messages, userName]);
            // });

            socket.on('message', message => {
                setMessages(messages => [...messages, message]);
            });
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

    const NewUserMessage = ({ user }) => (
        <li style={styles.liElement}>
            <div style={{
                display: 'block',
                // position: 'absolute',
                color: 'gray',
                textAlign: 'center',
                marginLeft: '-20px',
                marginBottom: '10px',
            }}>
                {user} has join
            </div>
        </li>
    )

    return (
        <div style={styles.chat}>
            <div style={styles.chatHistory}>
                <ul style={{ listStyleType: 'none' }}>
                    {messages.map((item, index) => {
                        if (!item.messageId) {
                            return <NewUserMessage key={index} user={item} />
                        }
                        if (item.userId === user.id) {
                            return <UserMessage key={index} message={item} />
                        } else {
                            return <GuestMessage key={index} message={item} />
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
        width: '40%',
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
    },
    liElement: {
        display: 'block',
        clear: 'both',
    }
}