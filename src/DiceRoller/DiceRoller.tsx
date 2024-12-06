import React, { useState } from "react";

function DiceRoller() {
  const [arrCount, setArrCount] = useState<number>(0);
  const [numbers, setNumbers] = useState<number[]>([]);
  const [error, setError] = useState<string>("");

  function generateRandomNumber() {
    return Math.floor(Math.random() * 6) + 1;
  }

  const handleArrCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const count = Number(e.target.value) || 0;

    if (count > 12) {
      setError("Please enter a number less than or equal to 12.");
    } else {
      setError("");
    }

    setArrCount(count);
  };

  const rollDice = () => {
    if (arrCount > 0 && !error) {
      const newNumbers = Array(arrCount)
        .fill(null)
        .map(() => generateRandomNumber());
      setNumbers(newNumbers);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <div className="mb-4">
        <input
          type="number"
          value={arrCount > 0 ? arrCount : ""}
          onChange={handleArrCountChange}
          placeholder="Enter number of blocks"
          className={`px-4 py-2 border rounded-md focus:outline-none focus:ring ${
            error
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-blue-500"
          }`}
        />
        {error && <div className="text-red-500 mt-2 text-sm">{error}</div>}
      </div>
      <button
        onClick={rollDice}
        disabled={arrCount === 0 || !!error}
        className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed">
        Roll Dice
      </button>
      <h4 className="text-lg font-semibold mt-6">Dice Rolls:</h4>
      <div className="grid grid-cols-4 gap-4 mt-4">
        {numbers.map((num, index) => (
          <div
            key={index}
            className="flex items-center justify-center w-12 h-12 bg-white shadow rounded-md text-lg font-bold">
            {num}
          </div>
        ))}
      </div>
    </div>
  );
}

export default DiceRoller;
