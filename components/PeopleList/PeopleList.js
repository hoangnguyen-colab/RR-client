import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '@contexts/UserContext';
import { SocketContext } from '@contexts/SocketContext';
import Image from 'next/image';
import Lottie from 'react-lottie';

import animationData from '@lottie/avatar';

function PeopleList() {
    const { user } = useContext(UserContext);
    const { socket } = useContext(SocketContext);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (socket) {
            socket.emit('getUserList', { userId: user.id }, function (userList) {
                setUsers(userList)
            });

            socket.on('on_join', userList => {
                setUsers(userList)
            });

            socket.on('on_disconnet', userList => {
                setUsers(userList)
            });
        }
    }, [socket]);

    const randomFile = Math.floor(Math.random() * 4);
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData[randomFile],
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    const UserItem = ({ name = "" }) => {
        return (
            <li style={styles.user}>
                <div style={styles.userImg}>
                    <Lottie
                        options={defaultOptions}
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

    const RenderUserList = () => {
        return (
            <ul style={styles.listStyle}>
                {users.length > 0 && users.map((item, index) => {
                    if (user.id !== item.userId) return <UserItem key={index} name={item.name} />
                    else return null;
                })}
            </ul>
        )
    }

    return (
        <div style={styles.peopleList}>
            <div style={styles.searchBox}>Active User</div>
            <RenderUserList />
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