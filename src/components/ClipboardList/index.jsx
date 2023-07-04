import React from 'react';
import ClipboardCard from '../ClipboardCard/index';
const { clipboard } = window.require('electron');
// import "./style.css";

export default function ClipboardList({
  items,
  removeItemHandler,
  addTextToClipboard,
}) {
  function handleRemoveItemCallback(id) {
    return () => {
      removeItemHandler(id);
    };
  }

  function handleRecopyItemContent(id, text) {
    return () => {
      clipboard.writeText(text);
      handleRemoveItemCallback(id)()
    };
  }

  return (
    <ul className="clipboard-list">
      {items.map((item, index) => (
        <ClipboardCard
          key={index}
          content={item.content}
          removeItemHandler={handleRemoveItemCallback(item.id)}
          recopyHandler={handleRecopyItemContent(item.id, item.content)}
        />
      ))}
    </ul>
  );
}
