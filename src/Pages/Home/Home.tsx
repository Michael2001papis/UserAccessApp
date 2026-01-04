import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, fetchCards } from "../../API/cards";
import { FcLike } from "react-icons/fc";
import { IoIosShareAlt } from "react-icons/io";
import { toast } from "react-toastify";
import { useAppSelector } from "../../store";
import axios from "axios";

interface HomeProps {
  searchTerm?: string;
}

const Home = ({ searchTerm = "" }: HomeProps) => {
  const [cards, setCards] = useState<Card[]>([]);
  const user = useAppSelector((state) => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    const loadCards = async () => {
      try {
        const data = await fetchCards();
        setCards(data);
      } catch (error) {
        toast.error("שגיאה בטעינת כרטיסים");
      }
    };
    loadCards();
  }, []);

  const filteredCards = cards.filter(card =>
    searchTerm === "" ||
    card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    card.phone.includes(searchTerm) ||
    card.bizNumber.includes(searchTerm) ||
    card.address.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getUserId = (): string | null => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return null;
      const decoded = JSON.parse(atob(token.split('.')[1]));
      return decoded._id;
    } catch {
      return null;
    }
  };

  const isFavorite = (card: Card): boolean => {
    const userId = getUserId();
    return userId ? card.likes?.includes(userId) || false : false;
  };

  const toggleFavorite = async (card: Card) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("נא להתחבר כדי לשמור מועדפים");
        navigate("/signin");
        return;
      }

      await axios.patch(
        `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${card._id}`,
        {},
        {
          headers: { "x-auth-token": token }
        }
      );
      
      const userId = getUserId();
      if (userId) {
        setCards(cards.map(c => {
          if (c._id === card._id) {
            const newLikes = c.likes || [];
            const isLiked = newLikes.includes(userId);
            return {
              ...c,
              likes: isLiked
                ? newLikes.filter(id => id !== userId)
                : [...newLikes, userId]
            };
          }
          return c;
        }));
        toast.success(isFavorite(card) ? "הוסר מהמועדפים ❤️" : "נוסף למועדפים ❤️");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "שגיאה בעדכון מועדפים");
    }
  };

  const shareCard = (card: Card) => {
    const subject = `כרטיס עסקי: ${card.title}`;
    const body = `שם: ${card.title}\nטלפון: ${card.phone}\nכתובת: ${card.address.city}, ${card.address.country}\nמספר כרטיס: ${card.bizNumber}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    toast.success("פתיחת Gmail לשיתוף הכרטיס...");
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold dark:text-white mb-2 text-center">
          UserAccessApp - כרטיסי ביקור עסקיים
        </h1>
        <h2 className="text-2xl text-gray-600 dark:text-gray-300 mb-8 text-center">
          גלה עסקים חדשים והצטרף לקהילה שלנו
        </h2>
        {!user && (
          <div className="bg-blue-500 text-white p-4 rounded-lg mb-6 text-center">
            <p className="text-lg font-semibold">רוצה להצטרף? הרשם עכשיו כדי לקבל גישה לכל הפיצ'רים!</p>
            <button
              onClick={() => navigate("/signin")}
              className="mt-2 bg-white text-blue-600 px-6 py-2 rounded hover:bg-gray-100 transition"
            >
              התחבר / הרשם
            </button>
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredCards.map(card => (
            <div
              key={card._id}
              className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden cursor-pointer hover:shadow-xl transition"
              onClick={() => navigate(`/card/${card._id}`)}
            >
              <img src={card.image.url} alt={card.image.alt} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-semibold">{card.title}</h2>
                <p>{card.subtitle}</p>
                <p>{card.phone}</p>
                <p>{card.address.city}, {card.address.country}</p>
                <p>{card.bizNumber}</p>
                <div className="flex justify-end space-x-3 text-xl mt-2" onClick={(e) => e.stopPropagation()}>
                  <FcLike
                    onClick={() => toggleFavorite(card)}
                    className={`cursor-pointer hover:scale-110 transition ${isFavorite(card) ? 'opacity-100' : 'opacity-50'}`}
                  />
                  <IoIosShareAlt
                    onClick={() => shareCard(card)}
                    className="cursor-pointer text-blue-500 hover:text-blue-700 hover:scale-110 transition"
                  />
                  {user?.role === "business" && card.userId === user?.username && (
                    <>
                      <button
                        onClick={() => navigate(`/edit-card/${card._id}`)}
                        className="cursor-pointer hover:scale-110 transition"
                        title="Edit"
                      >
                        ✏️
                      </button>
                      <button
                        className="cursor-pointer hover:scale-110 transition"
                        title="Delete"
                      >
                        🗑️
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        {filteredCards.length === 0 && (
          <p className="text-center text-gray-500 dark:text-gray-400 mt-8">לא נמצאו כרטיסים</p>
        )}
      </div>
    </div>
  );
};

export default Home;
