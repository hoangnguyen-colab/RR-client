import React, { useState, useContext, useEffect } from "react";
import { SocketContext } from '@contexts/SocketContext';
import { UserContext } from '@contexts/UserContext';
import Chat from "@components/Chat";
import PeopleList from "@components/PeopleList/PeopleList";
import { useRouter } from "next/router";
import withAuth from "@hocs/withAuth";

function Home() {
  const router = useRouter();
  const { user } = useContext(UserContext);
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    if (!user.id) {
      router.push("/login");
    }
  }, []);

  useEffect(() => {
    if (socket) {
      socket.emit('join', {
        userId: user.id,
        userName: user.name
      });
    }
  }, []);

  return (
    <div style={styles.container}>
      <PeopleList />
      <Chat />
    </div>
  );
}

export default withAuth(Home);

const styles = {
  container: {
    color: 'white',
    height: "100vh",
    margin: "0 auto",
    width: "100%",
    background: "#444753",
  },
};
