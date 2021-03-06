import React from "react";

function GuestMessage({ id = "", message = "", from = "" }) {
  return (
    <li style={styles.liElement}>
      <div style={styles.messageData}>
        <span style={styles.messageDataTime}>{new Date(message.date)?.toLocaleTimeString()}</span>
        &nbsp; &nbsp;
        <span style={styles.messageDataName}>{message.senderName}</span>{" "}
        <i className="fa fa-circle me"></i>
      </div>
      <div
        style={{
          ...styles.message,
          ...styles.guestMessage,
        }}
      >
        {message.message}
      </div>
    </li>
  );
}

export default GuestMessage;

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
  guestMessage: {
    background: "#94C2ED",
  },
  floatRight: {
    float: "right",
  },
  messageDataTime: { color: "#a8aab1", paddingLeft: "6px" },
  messageDataName: { float: 'left' },
};
