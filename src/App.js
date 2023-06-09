import React, { useState } from 'react';
import ClipboardCard from './components/ClipboardCard/index';
const { clipboard } = window.require('electron');
const clipboardListener = window.require('clipboard-event');
clipboardListener.startListening();

let clipboardCallback = () => console.log('Clipboard changed');
clipboardListener.on('change', () => {
  clipboardCallback()
});

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
    const text = clipboard.readText();
    
    if (clipboardItems.at(-1) !== text) {
      console.log("alterou clipboard",text)

      setClipboardItems([...clipboardItems, text]);
    }
  };
  clipboardCallback = debounce(handleClipboardChange, 100)

  const handleClearClipboard = () => {
    clipboard.clear();
    setClipboardItems([]);
  };

  return (
    <div>
      <h1 id="HeaderTitle">Clipboard Manager</h1>
      <button onClick={handleClearClipboard}>Limpar Histórico</button>
      <ul style={{"list-style":'none'}}>
        {clipboardItems.map((item, index) => (
          <ClipboardCard key={index} content={item}/>
        ))}
      </ul>
    </div>
  );
}

export default App;
