import { useState } from "react";
import Header from "./components/Header";
import Login from "./components/Login";
import NewsFeed from "./components/NewsFeed";
import { PostProvider } from "./context/postContext.jsx";
import { ToastContainer } from "react-toastify";

function App() {
  const [user, setUser] = useState(null);

  return (
    <PostProvider>
      <div className='min-h-screen flex flex-col'>
        <Header user={user} setUser={setUser} />
        <main className='flex-grow container mx-auto px-4 py-6'>
          {!user ? <Login setUser={setUser} /> : <NewsFeed user={user} />}
        </main>
        <footer className='bg-gray-800 text-white py-4 text-center'>
          <p className='text-sm'>2025 News App with SSE</p>
        </footer>
      </div>
      <ToastContainer />
    </PostProvider>
  );
}

export default App;
