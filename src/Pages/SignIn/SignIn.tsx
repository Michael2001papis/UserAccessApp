import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { SignInJoiSchema } from "../../validations/SigninSchema.joi";
import { useAppDispatch } from "../../store";
import { login } from "../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

interface SignInForm {
  email: string;
  password: string;
}

const SignIn = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<SignInForm>({ 
    resolver: joiResolver(SignInJoiSchema) 
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: SignInForm) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/login",
        { email: data.email, password: data.password }
      );
      const token = response.data;
      localStorage.setItem("token", token);
      
      const decodedUser = jwtDecode<JwtPayload & { _id: string; isBusiness: boolean; isAdmin: boolean }>(token);
      const role = decodedUser.isAdmin
        ? "admin"
        : decodedUser.isBusiness
        ? "business"
        : "user";
      
      dispatch(login({ username: data.email, role }));
      toast.success("Login successful!");
      navigate("/home");
    } catch (error: any) {
      const msg = error.response?.data?.message || error.message || "Login failed";
      toast.error(`Login failed: ${msg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 space-y-5"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white">
          Sign In
        </h2>
        <div>
          <input
            placeholder="Email"
            {...register("email")}
            className={`w-full p-3 rounded border focus:outline-none focus:ring-2 ${
              errors.email
                ? "border-red-500 focus:ring-red-300"
                : "border-gray-300 focus:ring-blue-300"
            } dark:bg-gray-700 dark:text-white dark:placeholder-gray-400`}
          />
          {errors.email && (
            <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
          )}
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            {...register("password")}
            className={`w-full p-3 rounded border focus:outline-none focus:ring-2 ${
              errors.password
                ? "border-red-500 focus:ring-red-300"
                : "border-gray-300 focus:ring-blue-300"
            } dark:bg-gray-700 dark:text-white dark:placeholder-gray-400`}
          />
          {errors.password && (
            <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
          )}
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded font-semibold text-white transition duration-200 ${
            loading
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default SignIn;
