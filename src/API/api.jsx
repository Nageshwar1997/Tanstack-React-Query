import axios from "axios";

const api = axios.create({
  baseURL: `https://jsonplaceholder.typicode.com`,
});

export const fetch_posts = async (page = 1) => {
  try {
    const res = await api.get(`/posts?_page=${page}&_limit=2`);
    return res.status === 200 ? res.data : [];
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
};
export const fetchPostIndv = async (id) => {
  try {
    const res = await api.get(`/posts/${id}`);
    return res.status === 200 ? res.data : {};
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
};

export const delete_post = async (id) => {
  try {
    return await api.delete(`/posts/${id}`);
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
};
export const update_post = async (id) => {
  try {
    return await api.put(`/posts/${id}`, { title: "Updated title" });
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
};

export const infinite_scroll = async ({ pageParam = 1 }) => {
  try {
    const res = await axios.get(
      `https://api.github.com/users?per_page=10&page=${pageParam}`
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};
