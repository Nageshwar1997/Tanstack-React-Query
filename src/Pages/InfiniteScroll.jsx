/* eslint-disable react-hooks/exhaustive-deps */
import { useInfiniteQuery } from "@tanstack/react-query";
import { infinite_scroll } from "../API/api";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const InfiniteScroll = () => {
  const {
    data,
    status,
    fetchNextPage,
    isFetchingNextPage,
    isFetchNextPageError,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["users"],
    queryFn: infinite_scroll,
    getNextPageParam: (lastPage, allPages) => {
      console.log("lastPage", lastPage);
      console.log("allPages", allPages);

      return lastPage?.length > 0 ? lastPage.length + 1 : undefined;
    },
  });

  // Without any library
  //   const handleScroll = () => {
  //     const bottom =
  //       window.innerHeight + document.documentElement.scrollTop ===
  //       document.documentElement.offsetHeight;
  //     // OR
  //     const bottom =
  //       window.innerHeight + window.scrollY >=
  //       document.documentElement.scrollHeight - 1;
  //     if (bottom && hasNextPage) {
  //       fetchNextPage();
  //     }
  //   };

  //   useEffect(() => {
  //     window.addEventListener("scroll", handleScroll);

  //     return () => window.removeEventListener("scroll", handleScroll);
  //   }, []);

  // With React-Intersection-Observer Library

  const { ref, inView } = useInView({
    threshold: 1,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "error") {
    return <p>Error: {"Something went wrong while fetching data"} </p>;
  }

  console.log("data", data);
  return (
    <div>
      <h1>Infinite Scroll</h1>
      {data?.pages?.map((page, ind) => (
        <ul key={ind}>
          {page?.map((user) => {
            return (
              <li
                key={user?.id}
                style={{ padding: "10px", border: "1px solid #ccc" }}
              >
                <p>{user?.login}</p>
                <img
                  src={user?.avatar_url}
                  alt={user?.login}
                  width={50}
                  height={50}
                />
              </li>
            );
          })}
        </ul>
      ))}
      <div ref={ref} style={{ padding: "20px", textAlign: "center" }}>
        {" "}
        {/* If using react-intersection-observer library  */}
        {isFetchingNextPage ? (
          <p>Loading more...</p>
        ) : hasNextPage ? (
          <p>Scroll down to load more</p>
        ) : (
          <p>No more users</p>
        )}
        {isFetchNextPageError && (
          <p>Error: {"Something went wrong while fetching more data"} </p>
        )}
      </div>
    </div>
  );
};

export default InfiniteScroll;
