import React, { useEffect, useState } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';

const client = new W3CWebSocket('ws://websocketsz.herokuapp.com');
const SOCKET_READY_STATE = 1;
const App = () => {
  const [messages, setMessages] = useState([]);

  const [messageText, setMessageText] = useState('');

  const handleInputChange = (e) => {
    setMessageText(e.target.value);
  };

  const sendMessage = (text) => {
    const message = {
      type: 'chatMessage',
      receivers: null,
      text,
    };
    if (client.readyState === SOCKET_READY_STATE) {
      client.send(JSON.stringify(message));
    } else {
      alert('The socket isn\'t ready yet, retry later');
    }
  };
  useEffect(() => {
    client.onopen = () => {
      console.log('WebSocket Client Connected');
    };
    client.onmessage = (message) => {
      console.log('received message', message);
      setMessages((previousState) => [...previousState, JSON.parse(message.data)]);
    };
    client.onclose = () => {
      console.log('disconnected');
    };
  }, []);

  const handleSendMessage = () => {
    sendMessage(messageText);
    setMessageText('');
  };

  const handleKeypress = (e) => {
    if (e.charCode === 13) {
      handleSendMessage();
    }
  };

  return (
    <>
      <div>
        Practical Intro To WebSockets.
      </div>
      <h1>Messages</h1>
      <input
        type="text"
        onChange={handleInputChange}
        onKeyPress={handleKeypress}
        value={messageText}
      />
      <button type="button" onClick={handleSendMessage}>SEND</button>
      <div>
        {messages.map((message) => (
          <div key={message.id} style={{ display: 'inline' }}>
            <div>
              {message.user}
              {' '}
              :
              {' '}
              {message.text}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default App;
