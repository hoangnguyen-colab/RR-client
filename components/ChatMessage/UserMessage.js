import React from "react";

function UserMessage({ id = "", message = "", from = "" }) {
  return (
    <li>
      <div style={{ ...styles.messageData, ...styles.alignRight }}>
        <span style={styles.messageDataTime}>10:10 AM, Today</span> &nbsp;
        &nbsp;
        <span style={styles.messageDataName}>{from}</span>{" "}
        <i class="fa fa-circle me"></i>
      </div>
      <div
        style={{
          ...styles.message,
          ...styles.userMessage,
          ...styles.floatRight,
        }}
      >
        {message}
      </div>
    </li>
  );
}

export default UserMessage;

const styles = {
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
    background: "#94C2ED",
  },
  floatRight: {
    float: "right",
  },
  messageDataTime: { color: "#a8aab1", paddingLeft: "6px" },
  messageDataName: {},
};
