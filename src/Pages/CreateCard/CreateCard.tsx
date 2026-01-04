import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useAppSelector } from "../../store";

interface CardForm {
  title: string;
  subtitle: string;
  description: string;
  phone: string;
  address: {
    city: string;
    country: string;
  };
  image: {
    url: string;
    alt: string;
  };
}

const CreateCard = () => {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);
  const { register, handleSubmit, formState: { errors } } = useForm<CardForm>();

  const onSubmit = async (data: CardForm) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login first");
        navigate("/signin");
        return;
      }

      await axios.post(
        "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards",
        data,
        {
          headers: { "x-auth-token": token }
        }
      );
      toast.success("Card created successfully!");
      navigate("/my-cards");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to create card");
    }
  };

  if (user?.role !== "business") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Access denied. Business users only.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold dark:text-white mb-6">Create New Card</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white dark:bg-gray-800 p-6 rounded-lg space-y-4">
          <div>
            <input
              {...register("title", { required: "Title is required" })}
              placeholder="Title"
              className="w-full p-3 rounded border dark:bg-gray-700 dark:text-white"
            />
            {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
          </div>
          <div>
            <input
              {...register("subtitle", { required: "Subtitle is required" })}
              placeholder="Subtitle"
              className="w-full p-3 rounded border dark:bg-gray-700 dark:text-white"
            />
            {errors.subtitle && <p className="text-red-500 text-sm">{errors.subtitle.message}</p>}
          </div>
          <div>
            <textarea
              {...register("description", { required: "Description is required" })}
              placeholder="Description"
              className="w-full p-3 rounded border dark:bg-gray-700 dark:text-white"
            />
            {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
          </div>
          <div>
            <input
              {...register("phone", { required: "Phone is required" })}
              placeholder="Phone"
              className="w-full p-3 rounded border dark:bg-gray-700 dark:text-white"
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
          </div>
          <div>
            <input
              {...register("address.city", { required: "City is required" })}
              placeholder="City"
              className="w-full p-3 rounded border dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <input
              {...register("address.country", { required: "Country is required" })}
              placeholder="Country"
              className="w-full p-3 rounded border dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <input
              {...register("image.url", { required: "Image URL is required" })}
              placeholder="Image URL"
              className="w-full p-3 rounded border dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <input
              {...register("image.alt")}
              placeholder="Image Alt Text"
              className="w-full p-3 rounded border dark:bg-gray-700 dark:text-white"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700"
          >
            Create Card
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCard;
