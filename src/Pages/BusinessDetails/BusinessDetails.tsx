import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchCardById, Card } from "../../API/cards";

const BusinessDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [card, setCard] = useState<Card | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCard = async () => {
      if (id) {
        const data = await fetchCardById(Number(id));
        setCard(data);
        setLoading(false);
      }
    };
    loadCard();
  }, [id]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!card) {
    return <div className="min-h-screen flex items-center justify-center">Card not found</div>;
  }

  const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(card.address.city + ", " + card.address.country)}`;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate("/home")}
          className="mb-4 text-blue-600 hover:underline"
        >
          ← Back to Home
        </button>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <img
            src={card.image.url}
            alt={card.image.alt}
            className="w-full h-64 object-cover"
          />
          <div className="p-8">
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
              {card.title}
            </h1>
            <h2 className="text-2xl text-gray-600 dark:text-gray-300 mb-6">
              {card.subtitle}
            </h2>
            <div className="space-y-4 mb-8">
              <p className="text-lg">
                <span className="font-semibold">Description:</span> {card.description}
              </p>
              <p className="text-lg">
                <span className="font-semibold">Phone:</span> {card.phone}
              </p>
              <p className="text-lg">
                <span className="font-semibold">Address:</span> {card.address.city}, {card.address.country}
              </p>
              <p className="text-lg">
                <span className="font-semibold">Business Number:</span> {card.bizNumber}
              </p>
            </div>
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-4">Location Map</h3>
              <iframe
                src={mapUrl}
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Business Location Map"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessDetails;
