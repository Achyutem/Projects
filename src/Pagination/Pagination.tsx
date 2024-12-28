import "./pagination.css";
import { useEffect, useState } from "react";

function Pagination() {
  const [data, setData] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const limit = 10;

  useEffect(() => {
    async function fetchData() {
      const results: string[] = [];
      try {
        for (
          let count = (page - 1) * limit + 1;
          count <= page * limit;
          count++
        ) {
          const url = `https://jsonplaceholder.typicode.com/todos/${count}`;
          const res = await fetch(url);
          if (!res.ok) {
            throw new Error("Can't fetch the URL");
          }
          const json = await res.json();
          results.push(json.title);
        }
        if (page === 1) {
          setData(results);
        } else {
          setData(() => [...results]);
        }
      } catch (err: any) {
        setError(err.message || "An error occurred");
      }
    }

    fetchData();
  }, [page]);

  const fetchNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const fetchPrevPage = () => {
    setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

  return (
    <div className="main">
      <h1>Pagination</h1>
      {error && <p>There was an error: {error}</p>}
      {data.length > 0 ? (
        <ul>
          {data.map((item, index) => (
            <li key={index}>
              <div className="card">{item}</div>
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
      <div className="footer">
        <button
          onClick={fetchPrevPage}
          disabled={page === 1}>
          Less
        </button>
        <p>{page}</p>
        <button onClick={fetchNextPage}>More</button>
      </div>
    </div>
  );
}

export default Pagination;
