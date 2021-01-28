import React, { useEffect, useState } from 'react';
import * as io from 'socket.io-client';
import ChatWindow from './chat-window/ChatWindow';

function App() {
  const [status, setStatus] = useState('OFFLINE');
  const [history, setHistory] = useState([]);
  const socket = io('http://localhost:4000');
  useEffect(() => {
    socket.on('connect', () => {
      setStatus('ONLINE');
      socket.emit('get_history');
    });
    socket.on('send_message', (data) => { setHistory(data); });
  }, []);
  const sendMessage = (e, mess, name) => {
    e.preventDefault();
    socket.emit('new_message', { message: mess, userName: name });
  };
  console.log('render');
  return (
    <div className="App">
      <h1>
        CHAT
        <span>
          {' '}
          (
          {status}
          )
        </span>
      </h1>
      <ChatWindow sendMessage={sendMessage} history={history} />
    </div>
  );
}

export default App;
