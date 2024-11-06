import { useEffect, useRef, useState } from "react";

const Search = () => {
  const arr = [
    "Apple",
    "Avacado",
    "Olive",
    "Orange",
    "Tomato",
    "Boolean",
    "Banana",
    "Grapes",
  ];
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleInput = (e: any) => {
    const val = e.target.value.trim();
    setQuery(val);
    if (val === "") {
      setSuggestions([]);
    } else {
      setQuery(val);
      const newArr = arr.filter((item) =>
        item.toLowerCase().startsWith(val.toLowerCase())
      );
      setSuggestions(newArr);
    }
  };

  return (
    <div className="relative w-64 mx-auto mt-10">
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={handleInput}
        placeholder="Search..."
        className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {suggestions.length > 0 && (
        <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-md max-h-60 overflow-auto">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => setQuery(suggestion)}
              className="p-3 cursor-pointer hover:bg-blue-100 focus:bg-blue-200">
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;
