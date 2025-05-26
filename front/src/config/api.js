export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const API_ENDPOINTS = {
  posts: `${API_URL}/api/posts`,
};

// Fonction utilitaire pour gérer les erreurs de réponse
export const handleResponse = async (response) => {
  if (!response.ok) {
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const error = await response.json();
      throw new Error(error.message || "Une erreur est survenue");
    } else {
      throw new Error(
        "Une erreur est survenue lors de la communication avec le serveur"
      );
    }
  }
  return response.json();
};
