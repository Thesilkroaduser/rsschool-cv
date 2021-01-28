/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import './chat.scss';

const ChatWindow = (props) => {
  const { sendMessage, history } = props;
  const input = useRef();
  const userNameArea = useRef();
  return (
    <section className="chat-wrapper">
      <form className="form">
        <label className="label" htmlFor="user-name">Set User Name</label>
        <input className="user" name="user-name" defaultValue="Anonymous" type="text" ref={userNameArea} />
      </form>
      <div className="history">
        {history.map((data, index) => (
          <p className={`message ${index % 2 ? 'colored' : ''}`} key={index.toString()}>{`${data.userName}: ${data.message}`}</p>
        ))}
      </div>
      <form
        className="form"
        onSubmit={(e) => {
          const message = input.current.value;
          const userName = userNameArea.current.value;
          sendMessage(e, message, userName);
          input.current.value = '';
        }}
      >
        <input className="inputArea" type="text" ref={input} />
        <button className="buttton" type="submit">
          SEND
        </button>
      </form>
    </section>
  );
};

ChatWindow.propTypes = {
  sendMessage: PropTypes.func.isRequired,
  history: PropTypes.arrayOf(PropTypes.shape(
    {
      message: PropTypes.string,
      userName: PropTypes.string,
    },
  )).isRequired,
};

export default ChatWindow;
