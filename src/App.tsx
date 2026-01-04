import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Pages/Home/Home";
import SignIn from "./Pages/SignIn/SignIn";
import Profile from "./Pages/Profile/Profile";
import MyCards from "./Pages/MyCards/MyCards";
import Settings from "./Pages/Settings/Settings";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { useAppSelector } from "./store";
import Copyright from "./Pages/Copyright";
import Favorites from "./Pages/Favorites";
import NewProfile from "./Pages/NewProfile/NewProfile";
import About from "./Pages/About";
import BusinessDetails from "./Pages/BusinessDetails/BusinessDetails";
import CreateCard from "./Pages/CreateCard/CreateCard";
import EditCard from "./Pages/EditCard/EditCard";
import CRM from "./Pages/CRM/CRM";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";

function App() {
  const user = useAppSelector((state) => state.auth.user);
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="flex flex-col min-h-screen">
      <Header onSearch={setSearchTerm} />
      <div className="flex-grow">
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/home" element={<Home searchTerm={searchTerm} />} />
          <Route path="/card/:id" element={<BusinessDetails />} />
          <Route path="/profile" element={user ? <Profile /> : <Navigate to="/signin" />} />
          <Route path="/my-cards" element={user?.role === "business" ? <MyCards /> : <Navigate to="/signin" />} />
          <Route path="/create-card" element={user?.role === "business" ? <CreateCard /> : <Navigate to="/signin" />} />
          <Route path="/edit-card/:id" element={user?.role === "business" ? <EditCard /> : <Navigate to="/signin" />} />
          <Route path="/crm" element={user?.role === "admin" ? <CRM /> : <Navigate to="/signin" />} />
          <Route path="/settings" element={user ? <Settings /> : <Navigate to="/signin" />} />
          <Route path="/copyright" element={<Copyright />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/new-profile" element={<NewProfile />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Navigate to="/signin" replace />} />
        </Routes>
      </div>
      <Footer />
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    </div>
  );
}

export default App;
