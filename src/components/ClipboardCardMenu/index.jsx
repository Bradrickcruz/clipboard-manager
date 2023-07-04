import React from 'react';

export default function ClipboardCardMenu({
  handleMenuVisibility,
  removeItemHandler,
  recopyHandler,
}) {
  return (
    <div className="absolute right-0 top-0 mt-2 mr-2">
      <div className="bg-white rounded shadow-md border border-gray-300">
        <button
          className="block text-black px-4 py-2 w-full text-left hover:bg-gray-100"
          onClick={() => {
            recopyHandler();
            removeItemHandler();
            handleMenuVisibility(false);
          }}
        >
          Copiar
        </button>
        <button
          className="block text-black px-4 py-2 w-full text-left hover:bg-gray-100"
          onClick={() => {
            removeItemHandler();
            handleMenuVisibility(false);
          }}
        >
          Excluir
        </button>
      </div>
    </div>
  );
}
