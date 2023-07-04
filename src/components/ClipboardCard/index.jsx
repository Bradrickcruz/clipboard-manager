import React, { useState } from 'react';
import './style.css';
import ClipboardCardMenu from '../ClipboardCardMenu/index';

export default function ClipboardCard({ content, removeItemHandler, recopyHandler }) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="clipboard-card overflow-hidden relative" title={content} onDoubleClick={recopyHandler}>
      {showMenu && (
        <ClipboardCardMenu
          removeItemHandler={removeItemHandler}
          handleMenuVisibility={setShowMenu}
          recopyHandler={recopyHandler}
        />
      )}
      <pre className="whitespace-pre-wrap break-words">{content}</pre>
      <button
        className="absolute right-0 top-0 p-2 hover:bg-gray-400 focus:outline-none"
        onClick={() => setShowMenu(!showMenu)}
      >
        ...
      </button>
    </div>
  );
}
