import { NavLink, useParams } from "react-router-dom";
import { fetchPostIndv } from "../API/api";
import { useQuery } from "@tanstack/react-query";

const FetchIndv = () => {
  const { id } = useParams();
  const {
    data = {},
    isPending, // Loading state
    isError, // Error state
    error,
  } = useQuery({
    queryKey: ["post", id], // Unique key for this query
    queryFn: () => fetchPostIndv(id), // Function to fetch the data
  });

  if (isError) {
    return <p>Error: {error.message ?? "Something went wrong"} </p>;
  }

  if (isPending) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      <div className="section-accordion">
        <h1>Post Id Number - {id}</h1>
        <div>
          <p>{data.title}</p>
          <p>{data.body}</p>
        </div>
        <NavLink to={-1}>
          <button>Back</button>
        </NavLink>
      </div>
    </div>
  );
};

export default FetchIndv;
