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
    <div>
      <h1>Todo App</h1>
      <input
        type="text"
        onChange={handleInput}
        value={inp}
      />
      <button onClick={Add}>Add</button>
      <div className="container">
        {dt.map((d, index) => {
          return (
            <div>
              <h4 key={index}>{d}</h4>
              <button onClick={() => Delete(index)}>Delete</button>
              <button onClick={() => Upward(index)}>Up</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Todo;
