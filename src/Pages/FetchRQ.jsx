import { fetchPosts } from "../API/api";
import { useQuery } from "@tanstack/react-query";

const FetchRQ = () => {
  const getPostsData = async () => {
    try {
      const res = await fetchPosts();

      console.log("res", res.data);

      res.status === 200 ? res.data : [];
    } catch (error) {
      console.log(error);
    }
  };

  const { data } = useQuery({
    queryKey: ["posts"], // useState works
    queryFn: getPostsData, // useEffect works
  }); // requires min 3 arguments 1. query key, 2. query function, 3. options object
  
  return (
    <div>
      <ul className="section-accordion">
        {data?.map((post) => (
          <li key={post.id}>
            <p>{post.title}</p>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FetchRQ;
