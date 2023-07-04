import React, { useState } from 'react';
import ClipboardList from './components/ClipboardList/index';
const { clipboard } = window.require('electron');
const clipboardListener = window.require('clipboard-event');
clipboardListener.startListening();

let clipboardCallback = () => console.log('Default Clipboard-event callback');
clipboardListener.on('change', () => clipboardCallback());

function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => (func.apply(this, args)), timeout);
  };
}

export default function App() {
  const [clipboardHistory, setClipboardHistory] = useState([]);
  const [clipboardIdCounter, setClipboardIdCounter] = useState(0);

  function handleTextClipboard() {
    let text = clipboard.readText();
    addTextToClipboardHistory(text);
    return null;
  }

  function handleChangeClipboard() {
    handleTextClipboard();
  }
  clipboardCallback = debounce(handleChangeClipboard, 50);

  function addTextToClipboardHistory(text) {
    if (
      !!text !== false &&
      (clipboardHistory.length === 0 || clipboardHistory[0].content !== text)
    ) {
      const clipboardItem = {
        id: clipboardIdCounter,
        content: text,
      };

      setClipboardHistory([clipboardItem, ...clipboardHistory]);
      setClipboardIdCounter(clipboardIdCounter + 1);
    }
  }

  function handleRemoveTextClipboard(id) {
    setClipboardHistory((prevClipboardHistory) => {
      const position = prevClipboardHistory.findIndex((item) => item.id === id);

      if (position > -1) {
        const updatedHistory = [...prevClipboardHistory];

        if (position === 0) {
          clipboard.writeText(updatedHistory[0].content);
          updatedHistory.splice(0, 1);
        } else updatedHistory.splice(position, 1);

        return updatedHistory;
      }

      return prevClipboardHistory;
    });
  }

  function handleRemoveClipboardItem(position) {
    handleRemoveTextClipboard(position);
  }

  const handleClearClipboard = () => {
    setClipboardHistory([]);
    clipboard.clear();
  };

  return (
    <>
      <h1 id="HeaderTitle">Clipboard Manager</h1>
      <button
        className="bg-white hover:bg-gray-100 text-gray-800 py-1 px-2 border border-gray-400 rounded shadow"
        onClick={handleClearClipboard}
      >
        Limpar Histórico
      </button>
      <ClipboardList
        items={clipboardHistory}
        removeItemHandler={handleRemoveClipboardItem}
        addTextToClipboard={addTextToClipboardHistory}
      />
    </>
  );
}
