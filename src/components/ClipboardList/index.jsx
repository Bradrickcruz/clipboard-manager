import React from 'react';
import ClipboardCard from '../ClipboardCard/index';
// import "./style.css";

function ClipboardList({ items }) {
  return (
    <ul className="clipboard-list">
      {items.map((item, index) => (
          <ClipboardCard key={index} content={item}/>
        ))}
    </ul>
  );
};

export default ClipboardList;
