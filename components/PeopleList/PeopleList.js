import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '@contexts/UserContext';
import { SocketContext } from '@contexts/SocketContext';
import PeopleListItem from '@components/PeopleList/PeopleListItem';

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

    const RenderUserList = () => {
        return (
            <ul style={styles.listStyle}>
                {users.length > 0 && users.map((item, index) => {
                    if (user.id !== item.userId) {
                        return (
                            <li style={styles.user}>
                                <PeopleListItem key={index} name={item.name} userId={item.userId}/>
                            </li>)
                    }
                    else return null;
                })}
            </ul>
        )
    }

    return (
        <div style={styles.peopleList}>
            <div style={styles.searchBox}>General</div>
            <div style={{ marginLeft: '20px' }}>
                <PeopleListItem isGeneral={true} name={"General"} />
            </div>
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
        width: "260px",
        float: "left",
        background: "#444753",
    },
    searchBox: {
        display: 'block',
        width: '100%',
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