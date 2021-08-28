import React, { useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Avatar from 'react-avatar';

function PeopleListItem({ name = "", userId = "" }) {

    return (
        <Link href={userId ? `/chat/${userId}` : '/'}>
            <a style={{
                display: 'flex',
                width: '100%',
            }}>
                <div style={styles.userImg}>
                    <Avatar name={name} size="50" round="50%"/>
                </div>
                <div style={styles.userAbout}>
                    <div className="name">{name}</div>
                    <div style={{ color: "#92959E" }}>
                        <i className="fa fa-circle online"></i> online
                    </div>
                </div>
            </a>
        </Link>

    )
}

export default PeopleListItem;

const styles = {
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