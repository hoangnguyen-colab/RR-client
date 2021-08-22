import React, { useState, useContext, useEffect } from 'react';
import { SocketContext } from '@contexts/SocketContext';
import Image from 'next/image';

function PeopleList() {
    const { socket } = useContext(SocketContext);

    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (socket) {
            socket.on('join', user => {
                setUsers(users => [...users, {
                    userId: user.userId,
                    name: user.name
                }]);
            });

            socket.on('on_disconnet', user => {
                setUsers(users.filter(item => item.userId !== user.userId));
            });
        }
    }, [socket]);

    const UserItem = ({ name = "" }) => {
        return (
            <li style={styles.user}>
                <div style={styles.userImg}>
                    <Image
                        src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01.jpg"
                        alt="avatar"
                        width={50}
                        height={50}
                    />
                </div>
                <div style={styles.userAbout}>
                    <div className="name">{name}</div>
                    <div style={{ color: "#92959E" }}>
                        <i className="fa fa-circle online"></i> online
                    </div>
                </div>
            </li>
        )
    }

    return (
        <div style={styles.peopleList}>
            <div style={styles.searchBox}>Active User</div>
            <ul style={styles.listStyle}>
                {users.length > 0 && users.map((item, index) => {
                    return (
                        <UserItem key={index} name={item.name} />
                    )
                })}
            </ul>
        </div>
    )
}

export default PeopleList;

const styles = {
    container: {
        color: 'white',
        height: "100vh",
        margin: "0 auto",
        width: "100%",
        background: "#444753",
        borderRadius: "5px",
    },
    listStyle: {
        listStyleType: "none",
        padding: '20px',
        height: '80%'
    },
    peopleList: {
        width: "30%",
        float: "left",
        background: "#444753",
    },
    searchBox: {
        padding: "20px",
    },
    user: {
        display: "block",
        clear: "both",
        content: "",
        marginBottom: '20px',
    },
    userImg: {
        float: "left",
    },
    userAbout: {
        paddingLeft: "8px",
        float: "left",
        marginTop: "8px",
    },
};