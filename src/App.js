import React, { useState } from 'react';
import ClipboardList from './components/ClipboardList/index';
const { clipboard } = window.require('electron');
const clipboardListener = window.require('clipboard-event');
clipboardListener.startListening();

let clipboardCallback = () => console.log('Default Clipboard-event callback');
clipboardListener.on('change', () => clipboardCallback());

function debounce(func, timeout = 300){
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
}

function App() {
  const [clipboardItems, setClipboardItems] = useState([]);

  function handleClipboardChange() {
    let text = clipboard.readText();
    
    if (text && clipboardItems.at(-1) !== text) {
      console.log("alterou clipboard",text)

      setClipboardItems([text, ...clipboardItems]);
    }
  };
  clipboardCallback = debounce(handleClipboardChange, 100);

  const handleClearClipboard = () => {
    setClipboardItems([]);
    clipboard.clear();
  };

  return (
    <>
      <h1 id="HeaderTitle">Clipboard Manager</h1>
      <button className="bg-white hover:bg-gray-100 text-gray-800 py-1 px-2 border border-gray-400 rounded shadow" onClick={handleClearClipboard}>Limpar Histórico</button>
      <ClipboardList items={clipboardItems} />
    </>
  );
}

export default App;
