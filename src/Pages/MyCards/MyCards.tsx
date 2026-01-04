import { useEffect, useState } from "react";
import { fetchCards, Card } from "../../API/cards";
import { useNavigate } from "react-router-dom";

const MyCards = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadCards = async () => {
      try {
        const data = await fetchCards();
        setCards(data);
      } catch (error) {
        // Error handled silently, cards will be empty
      } finally {
        setLoading(false);
      }
    };
    loadCards();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white transition-colors duration-300">
            My Cards
          </h1>
          <button 
            onClick={() => navigate("/create-card")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md transition-colors duration-200"
          >
            + Add New Card
          </button>
        </header>
        {loading ? (
          <p className="text-gray-600 dark:text-gray-300 animate-pulse">
            Loading cards...
          </p>
        ) : (
          <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {cards.map((card) => (
              <article
                key={card._id}
                className="bg-white dark:bg-gray-800 shadow-md rounded-xl overflow-hidden transition-colors duration-300 hover:shadow-lg"
              >
                <img
                  src={card.image.url}
                  alt={card.image.alt}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-1">
                    {card.title}
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                    {card.description}
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-200">
                    <span className="font-semibold">Phone:</span> {card.phone}
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-200">
                    <span className="font-semibold">Address:</span>{" "}
                    {card.address.city}, {card.address.country}
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-200">
                    <span className="font-semibold">Card Number:</span>{" "}
                    {card.bizNumber}
                  </p>
                  <footer className="flex justify-end mt-4 space-x-3 text-gray-500 dark:text-gray-300 text-xl">
                    <button
                      onClick={() => navigate(`/edit-card/${card._id}`)}
                      className="hover:text-blue-600 transition"
                      aria-label="Edit"
                    >
                      ✏️
                    </button>
                    <button
                      className="hover:text-red-600 transition"
                      aria-label="Delete"
                    >
                      🗑️
                    </button>
                  </footer>
                </div>
              </article>
            ))}
          </section>
        )}
      </div>
    </div>
  );
};

export default MyCards;
