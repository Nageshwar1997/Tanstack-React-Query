import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { fetch_posts, update_post } from "../API/api";

const FetchRQ2 = () => {
  const [page, setPage] = useState(1);

  const queryClient = useQueryClient();

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
  // Mutation

  const deletePost = useMutation({
    mutationKey: ["delete_post"],
    mutationFn: (id) => deletePost(id),
    onSuccess: (data, id) => {
      if (data.status === 200) {
        console.log(id, "Post deleted successfully");
      }
      queryClient.setQueryData(["posts", page], (currEl) =>
        currEl?.filter((post) => post.id !== id)
      );
    },
  });

  const updatePost = useMutation({
    mutationKey: ["update_post"],
    mutationFn: (id) => update_post(id),
    onSuccess: (apiData, postId) => {
      if (apiData.status === 200) {
        console.log(postId, "Post updated successfully");
      }

      console.log("apiData", apiData);
      console.log("postId", postId);
      queryClient.setQueryData(["posts", page], (postsData) =>
        postsData?.map((post) =>
          post.id === postId ? { ...post, ...apiData.data } : post
        )
      );
    },
  });

  if (isError) {
    return <p>Error: {error.message ?? "Something went wrong"} </p>;
  }

  if (isPending) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      <ul className="section-accordion">
        {data.map((post, index) => {
          return (
            <li key={post.id + index}>
              <NavLink to={`/rq/${post.id}`}>
                <p>{post.id}</p>
                <p>{post.title}</p>
                <p>{post.body}</p>
              </NavLink>
              <button onClick={() => deletePost.mutate(post.id)}>Delete</button>
              <button onClick={() => updatePost.mutate(post.id)}>Update</button>
            </li>
          );
        })}
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

export default FetchRQ2;
