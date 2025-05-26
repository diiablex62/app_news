import { createContext, useState } from "react";

const PostContext = createContext();

const PostProvider = ({ children }) => {
  const [news, setNews] = useState([]);

  const addNews = (newPost) => {
    setNews((prevNews) => [...prevNews, newPost]);
  };

  return (
    <PostContext.Provider value={{ news, setNews, addNews }}>
      {children}
    </PostContext.Provider>
  );
};

export { PostContext, PostProvider };
