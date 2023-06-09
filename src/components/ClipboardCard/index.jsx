import React from 'react';
import "./style.css";

const ClipboardCard = ({ content }) => {
  return (
    <div className="clipboard-card">
      <pre>{content}</pre>
    </div>
  );
};

export default ClipboardCard;
