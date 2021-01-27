import React, { useRef } from 'react';
import './chat.scss';

const ChatWindow = () => {
  const message = useRef();
  return (
    <section className="chat-wrapper">
      <form className="form">
        <input type="text" />
        <button type="submit">Set User Name</button>
      </form>
      <div className="history">{}</div>
      <form
        className="form"
      >
        <input type="text" ref={message} />
        <button type="submit">SEND</button>
      </form>
    </section>
  );
};

export default ChatWindow;
