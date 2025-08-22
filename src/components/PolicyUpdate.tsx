import React, { useState } from 'react';

function PolicyUpdate() {
  const [value, setValue] = useState(2);
  const [dropdownValue, setDropdownValue] = useState('>');

  const handleDecrease = () => {
    setValue(prev => Math.max(0, prev - 1));
  };

  const handleIncrease = () => {
    setValue(prev => prev + 1);
  };

  const handleDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDropdownValue(e.target.value);
  };

  return (
    <div className="bg-white p-6 rounded-lg">
      <div className="flex items-center mb-4">
        <h2 className="text-xl font-bold mr-2">Update policies</h2>
        <img src="/src/assets/smart_toy.svg" alt="Policy Icon" className="w-5 h-5" />
      </div>
      <p className="text-gray-600 mb-6">Define the policies and rules that trigger them</p>

      <div className="mb-6">
        <h3 className="text-lg font-bold mb-2">Derogatory bureau data</h3>
        <p className="text-gray-600 mb-4">Worst current status on the bureau</p>
        <div className="flex items-center space-x-2">
          <select 
            className="border border-gray-300 rounded-md p-2"
            value={dropdownValue}
            onChange={handleDropdownChange}
          >
            <option value=">">&gt;</option>
            <option value="<">&lt;</option>
            <option value="=">=</option>
          </select>
          <button 
            className="bg-gray-800 text-white py-2 px-4 rounded-md"
            onClick={handleDecrease}
          >
            -
          </button>
          <span className="border border-gray-300 rounded-md py-2 px-4 w-12 text-center">{value}</span>
          <button 
            className="bg-gray-800 text-white py-2 px-4 rounded-md"
            onClick={handleIncrease}
          >
            +
          </button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold mb-4">Decision:</h3>
        <div className="flex space-x-4">
          <button className="bg-white text-blue-600 py-2 px-4 rounded-md border border-gray-300">Accept</button>
          <button className="bg-white text-blue-600 py-2 px-4 rounded-md border border-gray-300">Refer</button>
          <button className="bg-purple-600 text-white py-2 px-4 rounded-md">Decline</button>
        </div>
      </div>
    </div>
  );
}

export default PolicyUpdate;
