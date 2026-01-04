import axios from "axios";

export interface Card {
  _id: number;
  title: string;
  subtitle: string;
  description: string;
  phone: string;
  address: {
    city: string;
    country: string;
    street?: string;
    houseNumber?: string;
  };
  bizNumber: string;
  image: {
    url: string;
    alt: string;
  };
  userId?: string;
  likes?: string[];
}

const API_BASE = "https://monkfish-app-z9uza.ondigitalocean.app/bcard2";

export const fetchCards = async (): Promise<Card[]> => {
  try {
    const response = await axios.get<Card[]>(`${API_BASE}/cards`);
    return response.data;
  } catch (error) {
    return [];
  }
};

export const fetchCardById = async (id: number): Promise<Card | null> => {
  try {
    const response = await axios.get<Card>(`${API_BASE}/cards/${id}`);
    return response.data;
  } catch (error) {
    return null;
  }
};

export const toggleCardLike = async (cardId: number): Promise<boolean> => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token");
    
    const response = await axios.patch(
      `${API_BASE}/cards/${cardId}`,
      {},
      {
        headers: { "x-auth-token": token }
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchUserFavorites = async (): Promise<Card[]> => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return [];
    
    const response = await axios.get<Card[]>(`${API_BASE}/cards`, {
      headers: { "x-auth-token": token }
    });
    const userId = JSON.parse(atob(token.split('.')[1]))._id;
    return response.data.filter(card => card.likes?.includes(userId));
  } catch (error) {
    return [];
  }
};
