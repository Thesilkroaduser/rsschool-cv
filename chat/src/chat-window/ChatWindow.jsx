import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import './chat.scss';

const ChatWindow = (props) => {
  const { content, handleServer } = props;
  const message = useRef();
  return (
    <section className="chat-wrapper">
      <form className="form">
        <input type="text" />
        <button type="submit">Set User Name</button>
      </form>
      <div className="history">{content}</div>
      <form
        className="form"
        onSubmit={(e) => {
          const text = message.current.value;
          handleServer(e, text);
          message.current.value = '';
        }}
      >
        <input type="text" ref={message} />
        <button type="submit">SEND</button>
      </form>
    </section>
  );
};

ChatWindow.propTypes = {
  content: PropTypes.string.isRequired,
  handleServer: PropTypes.func.isRequired,
};

export default ChatWindow;
