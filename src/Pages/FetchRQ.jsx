import { NavLink } from "react-router-dom";
import { fetch_posts } from "../API/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";

const FetchRQ = () => {
  const [page, setPage] = useState(1);

  const {
    data = [],
    isPending, // Loading state
    isError, // Error state
    error,
  } = useQuery({
    queryKey: ["posts", page], // Unique key for this query
    queryFn: () => fetch_posts(page), // Function to fetch the data
    // gcTime: 1000, // Time before the query is considered stale
    // staleTime: 10000, // Time before the query is considered stale
    // refetchInterval: 1000, // Interval at which the query is refetched
    // refetchIntervalInBackground: true, // Refetch the query in the background
    placeholderData: keepPreviousData, // Placeholder data while the query is loading (it shows the previous data)
  });

  // console.log("data", data);

  // console.log("error", error);
  // console.log("isError", isError);
  // console.log("isPending", isPending);

  if (isError) {
    return <p>Error: {error.message ?? "Something went wrong"} </p>;
  }

  if (isPending) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      <ul className="section-accordion">
        {data.map((post) => (
          <li key={post.id}>
            <NavLink to={`/rq/${post.id}`}>
              <p>{post.id}</p>
              <p>{post.title}</p>
              <p>{post.body}</p>
            </NavLink>
          </li>
        ))}
      </ul>
      <div className="pagination-section container">
        <button
          disabled={page === 1}
          onClick={() => setPage((old) => Math.max(old - 1, 1))}
        >
          Prev
        </button>
        <h2>Page {page}</h2>
        <button onClick={() => setPage((old) => old + 1)}>Next</button>
      </div>
    </div>
  );
};

export default FetchRQ;
