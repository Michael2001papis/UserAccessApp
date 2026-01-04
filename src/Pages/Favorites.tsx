import { useState, useEffect } from "react";
import { Card, fetchUserFavorites } from "../API/cards";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function Favorites() {
  const [favorites, setFavorites] = useState<Card[]>([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const data = await fetchUserFavorites();
        setFavorites(data);
      } catch (error) {
        toast.error("שגיאה בטעינת מועדפים");
      } finally {
        setLoading(false);
      }
    };
    loadFavorites();
  }, []);

  const clearFavorites = async () => {
    if (!window.confirm("האם אתה בטוח שברצונך להסיר את כל המועדפים?")) {
      return;
    }
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      
      for (const card of favorites) {
        try {
          await axios.patch(
            `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${card._id}`,
            {},
            {
              headers: { "x-auth-token": token }
            }
          );
        } catch (error) {
          // Silent fail for individual cards
        }
      }
      setFavorites([]);
      setSelectedIds(new Set());
      toast.success("כל המועדפים הוסרו");
    } catch (error) {
      toast.error("שגיאה בהסרת מועדפים");
    }
  };

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
    setSelectedIds(new Set());
  };

  const toggleCardSelection = (id: number) => {
    setSelectedIds(prev => {
      const newSet = new Set(prev);
      newSet.has(id) ? newSet.delete(id) : newSet.add(id);
      return newSet;
    });
  };

  const deleteSelected = async () => {
    if (selectedIds.size === 0) return;
    
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      for (const id of selectedIds) {
        try {
          await axios.patch(
            `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${id}`,
            {},
            {
              headers: { "x-auth-token": token }
            }
          );
        } catch (error) {
          // Silent fail for individual cards
        }
      }
      
      const updated = favorites.filter(card => !selectedIds.has(card._id));
      setFavorites(updated);
      setSelectedIds(new Set());
      if (updated.length === 0) setIsEditMode(false);
      toast.success("המועדפים שנבחרו הוסרו");
    } catch (error) {
      toast.error("שגיאה בהסרת מועדפים");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6 flex items-center justify-center">
        <p className="text-gray-600 dark:text-gray-300">טוען מועדפים...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-8">
        מועדפים שלי
      </h1>
      {favorites.length === 0 ? (
        <div className="text-center text-gray-500 dark:text-gray-400">
          <p className="text-xl mb-4">אין מועדפים עדיין</p>
          <button
            onClick={() => navigate("/home")}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            עבר לעמוד הבית
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {favorites.map((card) => (
              <div
                key={card._id}
                className={`relative bg-white dark:bg-gray-800 shadow-lg transition-shadow duration-300 rounded-2xl overflow-hidden hover:shadow-xl transform ${
                  isEditMode ? "hover:scale-[1.01]" : "hover:scale-[1.02]"
                }`}
              >
                {isEditMode && (
                  <input
                    type="checkbox"
                    className="absolute top-2 right-2 w-5 h-5"
                    checked={selectedIds.has(card._id)}
                    onChange={() => toggleCardSelection(card._id)}
                  />
                )}
                <img
                  src={card.image.url}
                  alt={card.image.alt}
                  className="w-full h-48 object-cover cursor-pointer"
                  onClick={() => navigate(`/card/${card._id}`)}
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-1">
                    {card.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300">{card.phone}</p>
                  <p className="text-gray-500 dark:text-gray-400">
                    {card.address.city}, {card.address.country}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-4 mt-10">
            <button
              onClick={toggleEditMode}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              {isEditMode ? "סיים עריכה" : "ערוך מועדפים"}
            </button>
            {isEditMode && (
              <>
                <button
                  onClick={deleteSelected}
                  disabled={selectedIds.size === 0}
                  className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  מחק נבחרים ({selectedIds.size})
                </button>
                <button
                  onClick={clearFavorites}
                  className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition"
                >
                  מחק הכל
                </button>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
