import React, { useState, useEffect } from 'react';

const { clipboard } = window.require('electron');

function App() {
  const [clipboardItems, setClipboardItems] = useState([]);
  const [clipboardLastItem, setClipboardLastItem] = useState("");

  setInterval(() => {
    const text = clipboard.readText();
    if (text !== clipboardLastItem) {
      console.log('Texto copiado:', text);
      setClipboardLastItem(text);
    }
  }, 500);

  useEffect(()=>{
    setClipboardItems((prevItems) => [...prevItems, clipboardLastItem]);
  },[clipboardLastItem])

  const handleClearClipboard = () => {
    setClipboardItems([]);
  };

  return (
    <div>
      <h1>Clipboard Manager</h1>
      <button onClick={handleClearClipboard}>Limpar Histórico</button>
      <ul>
        {clipboardItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
