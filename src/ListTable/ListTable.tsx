import { useEffect, useState } from "react";

const ListTable = () => {
  const [data, setData] = useState<any[]>([]);
  const [displayed, setDisplayed] = useState(2);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/todos/");
        const json = await res.json();
        setData(json);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleAddTodos = () => {
    setDisplayed((prevCount) => prevCount + 2);
  };

  const handleSubTodos = () => {
    if (displayed === 0) return;
    setDisplayed((prevCount) => prevCount - 2);
  };

  return (
    <div className="flex flex-col items-center p-4 bg-gray-100 min-h-screen">
      {data.length === 0 || displayed === 0 ? (
        <>
          <h1>No Data was found</h1>
          <button
            onClick={handleAddTodos}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Add 2
          </button>
        </>
      ) : (
        <>
          <div className="w-full max-w-md p-4 bg-white shadow-lg rounded-md mb-4">
            {data.slice(0, displayed).map((dt, index) => (
              <div
                key={index}
                className="p-2 border-b last:border-b-0 text-gray-800">
                {dt.title}
              </div>
            ))}
          </div>
          <div className="flex space-x-4">
            <button
              onClick={handleAddTodos}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Add 2
            </button>
            <button
              onClick={handleSubTodos}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
              Remove 2
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ListTable;
