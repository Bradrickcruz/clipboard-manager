import React, { useState } from 'react';

const { clipboard } = window.require('electron');

function App() {
  const [clipboardItems, setClipboardItems] = useState([]);

  const handleClearClipboard = () => {
    setClipboardItems([]);
  };

  const handlePaste = () => {
    const text = clipboard.readText();
    setClipboardItems((prevItems) => [...prevItems, text]);
  };

  const handlePasteImage = () => {
    const image = clipboard.readImage();
    // setClipboardItems((prevItems) => [...prevItems, image]);
    // Faça algo com a imagem aqui, como salvá-la em algum lugar
  };

  return (
    <div>
      <h1>Clipboard Manager</h1>
      <button onClick={handlePaste}>Colar Texto</button>
      <button onClick={handlePasteImage}>Colar Imagem</button>
      <ul>
        {clipboardItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <button onClick={handleClearClipboard}>Limpar Histórico</button>
    </div>
  );
}

export default App;
