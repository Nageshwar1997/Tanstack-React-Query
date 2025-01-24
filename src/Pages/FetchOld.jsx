import { useEffect, useState } from "react";
import { fetchPosts } from "../API/api";

const FetchOld = () => {
  const [posts, setPosts] = useState([]);

  const getPostsData = async () => {
    try {
      const res = await fetchPosts();

      // console.log("res", res.data);

      res.status === 200 ? setPosts(res.data) : [];
    } catch (error) {
      console.log(error);
      setPosts([]);
    }
  };

  useEffect(() => {
    getPostsData();
  }, []);
  return (
    <div>
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
