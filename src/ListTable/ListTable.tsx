import { useEffect, useState } from "react";

const ListTable = () => {
  const [data, setData] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/todos/");
        const Json = await res.json();
        console.log(Json);
        setData(Json);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  console.log(data);
  return (
    <div>
      {data &&
        data.map((dt: any, index: number) => {
          return <div key={index}>{dt.title}</div>;
        })}
    </div>
  );
};

export default ListTable;
