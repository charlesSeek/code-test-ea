import React, { useState } from 'react';
import { Order } from '../../types';

interface Props {
  onToggle: (order: Order) => void;
}
const SortSwitcher = ({ onToggle } : Props) => {
  const [isAsc, setIsAsc] = useState(true);
  const handleToggle = () => {
    const newState = !isAsc;
    setIsAsc(newState);
    const order = newState ? 'asc' : 'desc';
    onToggle(order);
  };

  return (
    <div
      onClick={handleToggle}
      className="flex items-center w-32 p-1 cursor-pointer rounded-full bg-gray-200 transition-all duration-300"
    >
      <div
        className={`flex-1 text-center py-1 rounded-full transition-colors duration-300 ${
          isAsc ? 'bg-blue-500 text-white' : 'text-gray-600'
        }`}
      >
        ASC
      </div>
      <div
        className={`flex-1 text-center py-1 rounded-full transition-colors duration-300 ${
          !isAsc ? 'bg-blue-500 text-white' : 'text-gray-600'
        }`}
      >
        DESC
      </div>
    </div>
  );
};

export default SortSwitcher;
