import React from "react";

function UserMessage({ message = {}}) {
  return (
    <li style={styles.liElement}>
      <div style={{ ...styles.messageData, ...styles.alignRight }}>
        <span style={styles.messageDataTime}>{new Date(message.date)?.toLocaleTimeString()}</span> &nbsp;
        &nbsp;
        <span style={styles.messageDataName}>{message.senderName}</span>{" "}
        <i className="fa fa-circle me"></i>
      </div>
      <div
        style={{
          ...styles.message,
          ...styles.userMessage,
          ...styles.floatRight,
        }}
      >
        {message.message}
      </div>
    </li>
  );
}

export default UserMessage;

const styles = {
  liElement: {
      display: 'block',
      clear: 'both',
  },
  messageData: {
    marginBottom: "15px",
  },
  alignRight: {
    textAlign: "right",
  },
  message: {
    color: "white",
    padding: "18px 20px",
    lineHeight: "26px",
    fontSize: "16px",
    borderRadius: "7px",
    marginBottom: "30px",
    width: "90%",
    position: "relative",
  },
  userMessage: {
    background: "#86BB71",
  },
  floatRight: {
    float: "right",
  },
  messageDataTime: { color: "#a8aab1", paddingLeft: "6px" },
  messageDataName: {},
};
