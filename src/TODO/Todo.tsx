import { useState } from "react";

const Todo = () => {
  const [dt, setDt] = useState<string[]>([
    "some random task",
    "another task",
    "yet another random task",
  ]);
  const [inp, setInp] = useState("");

  const handleInput = (e: any) => {
    setInp(e.target.value);
  };

  const Add = () => {
    setDt([...dt, inp]);
    setInp("");
  };

  const Delete = (index: number) => {
    const newDt = dt.filter((_, i) => i !== index);
    setDt(newDt);
  };

  const Upward = (index: number) => {
    if (index === 0) return;
    const newDt = [...dt];
    [newDt[index], newDt[index - 1]] = [newDt[index - 1], newDt[index]];
    setDt(newDt);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-4">Todo App</h1>
      <div className="flex mb-4">
        <input
          type="text"
          onChange={handleInput}
          value={inp}
          className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring focus:ring-blue-500"
          placeholder="Add a new task"
        />
        <button
          onClick={Add}
          className="bg-blue-500 text-white font-semibold p-2 rounded-r-md hover:bg-blue-600 transition duration-200">
          Add
        </button>
      </div>
      <div className="space-y-4">
        {dt.map((d, index) => {
          return (
            <div
              key={index}
              className="flex justify-between items-center p-2 bg-gray-100 rounded-md">
              <h4 className="text-lg">{d}</h4>
              <div>
                <button
                  onClick={() => Delete(index)}
                  className="bg-red-500 text-white font-semibold p-1 rounded-md hover:bg-red-600 transition duration-200 mr-2">
                  Delete
                </button>
                <button
                  onClick={() => Upward(index)}
                  className="bg-yellow-500 text-white font-semibold p-1 rounded-md hover:bg-yellow-600 transition duration-200">
                  Up
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Todo;
