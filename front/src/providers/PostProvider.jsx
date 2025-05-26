import { useState } from "react";
import { PostContext } from "../context/postContext";

export default function PostProvider({ children }) {
  const [news, setNews] = useState([]);

  console.log(news);

  const addNews = (newPost) => {
    setNews([...news, newPost]);
  };
  return (
    <PostContext.Provider value={{ news, addNews }}>
      {children}
    </PostContext.Provider>
  );
}
