import React from 'react';
import * as io from 'socket.io-client';
import ChatWindow from './chat-window/ChatWindow';

function App() {
  const socket = io('http://localhost:4000');
  socket.on('connect', () => {
    socket.emit('hello', 'hi');
  });

  return (
    <div className="App">
      <h1>
        Chat
        <span>
          {' '}
          (
          {}
          )
        </span>
      </h1>
      <ChatWindow />
    </div>
  );
}

export default App;
