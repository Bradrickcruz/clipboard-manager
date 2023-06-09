import React from 'react';
import "./style.css";

const ClipboardCard = ({ content }) => {
  return (
    <div className="clipboard-card overflow-hidden">
      <pre className="whitespace-pre-wrap break-words" >{content}</pre>
    </div>
  );
};

export default ClipboardCard;
