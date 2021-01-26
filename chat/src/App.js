import React, { useState, useEffect } from 'react';
import ChatWindow from './chat-window/ChatWindow';

function App() {
  const ws = new WebSocket('ws://localhost:4000');
  const [status, setStatus] = useState('OFFLINE');
  const [content, setContent] = useState('');

  const printMessage = (value) => {
    setContent(value);
  };

  const handleServer = (e, value) => {
    e.preventDefault();
    ws.send(value);
  };

  useEffect(() => {
    ws.onopen = () => {
      setStatus('ONLINE');
    };
    ws.onclose = () => {
      setStatus('DISCONNECTED');
    };
  }, []);

  ws.onmessage = (response) => {
    console.log(response.data);
    printMessage(response.data);
  };

  return (
    <div className="App">
      <h1>
        Chat
        <span>
          {' '}
          (
          {status}
          )
        </span>
      </h1>
      <ChatWindow content={content} handleServer={handleServer} />
    </div>
  );
}

export default App;
