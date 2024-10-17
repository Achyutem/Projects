import { useState } from "react";
import "./Otp.css";

const Otp = () => {
  const [value, setValue] = useState(Array(6).fill(""));

  const handleClick = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newVal = [...value];
    newVal[index] = e.target.value;
    setValue(newVal);
    console.log(newVal);
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !value[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      prevInput?.focus();
    } else if (
      e.key !== "Backspace" &&
      value[index].length === 1 &&
      index < value.length - 1
    ) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  return (
    <div className="stack">
      {value.map((val, index) => (
        <input
          type="text"
          value={val}
          onChange={(e) => handleClick(index, e)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          maxLength={1}
          id={`otp-input-${index}`}
          key={index}
        />
      ))}
    </div>
  );
};

export default Otp;