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
      console.log('removendo item: ', id);
      removeItemHandler(id);
    };
  }

  function handleAddItemContent(text) {
    return () => {
      console.log('recopy item: ', text);
      clipboard.writeText(text);
      // addTextToClipboard(text);
    };
  }

  return (
    <ul className="clipboard-list">
      {items.map((item, index) => (
        <ClipboardCard
          key={index}
          content={item.content}
          removeItemHandler={handleRemoveItemCallback(item.id)}
          recopyHandler={handleAddItemContent(item.content)}
        />
      ))}
    </ul>
  );
}
