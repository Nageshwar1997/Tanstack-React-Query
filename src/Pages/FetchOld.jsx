import { useEffect, useState } from "react";
import { fetchPosts } from "../API/api";

const FetchOld = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchPosts().then((data) => {
      setPosts(data);
      setLoading(false);
    }).catch((error) => {
      setError(error.message || "Something went wrong");
    });
    setLoading(false);

  }, []);
  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ul className="section-accordion">
        {posts?.map((post) => (
          <li key={post.id}>
            <p>{post.title}</p>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FetchOld;
