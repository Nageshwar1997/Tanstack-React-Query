import { NavLink } from "react-router-dom";
import { fetchPosts } from "../API/api";
import { useQuery } from "@tanstack/react-query";

const FetchRQ = () => {
  const {
    data = [],
    isPending, // Loading state
    isError, // Error state
    error,
  } = useQuery({
    queryKey: ["posts"], // Unique key for this query
    queryFn: fetchPosts, // Function to fetch the data
    // gcTime: 1000, // Time before the query is considered stale
    // staleTime: 10000, // Time before the query is considered stale
    refetchInterval: 1000, // Interval at which the query is refetched
    refetchIntervalInBackground: true, // Refetch the query in the background
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
    </div>
  );
};

export default FetchRQ;
