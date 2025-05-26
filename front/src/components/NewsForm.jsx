import { useState, useContext } from "react";
import { PostContext } from "../context/postContext.jsx";
import { toast } from "react-toastify";

function NewsForm({ toggleForm }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("technology");
  const postContext = useContext(PostContext);

  if (!postContext) {
    return <div>Loading...</div>;
  }

  const { addNews } = postContext;

  const categories = [
    { id: "technology", label: "Technology" },
    { id: "health", label: "Health" },
    { id: "politics", label: "Politics" },
    { id: "business", label: "Business" },
    { id: "entertainment", label: "Entertainment" },
    { id: "sports", label: "Sports" },
    { id: "science", label: "Science" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://app-news-qfqs.onrender.com/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
          category,
          author: "User", // Pour l'instant, on met un auteur par défaut
        }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'ajout du post");
      }

      const newPost = await response.json();
      addNews(newPost);

      // Nettoyage des champs
      setTitle("");
      setContent("");
      setCategory("technology");

      // Fermeture du formulaire
      toggleForm();

      toast.success("Post ajouté avec succès !");
    } catch (error) {
      console.error("Erreur:", error);
      toast.error("Impossible d'ajouter le post");
    }
  };

  return (
    <div className='card p-4'>
      <h3 className='text-xl font-semibold mb-4'>Post a News Update</h3>

      <form onSubmit={handleSubmit}>
        <div className='mb-4'>
          <label htmlFor='title' className='block text-gray-700 mb-2'>
            Title
          </label>
          <input
            type='text'
            id='title'
            className='form-input'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Enter news title'
            required
          />
        </div>

        <div className='mb-4'>
          <label htmlFor='category' className='block text-gray-700 mb-2'>
            Category
          </label>
          <select
            id='category'
            className='form-input'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        <div className='mb-4'>
          <label htmlFor='content' className='block text-gray-700 mb-2'>
            Content
          </label>
          <textarea
            id='content'
            className='form-input min-h-[100px]'
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder='Enter news content'
            required
          />
        </div>

        <div className='flex justify-end space-x-2'>
          <button type='submit' className='btn btn-primary'>
            Post News
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewsForm;
