import { Link } from "react-router-dom";
import { useAppSelector } from "../store";

const Footer = () => {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <footer className="bg-gray-800 dark:bg-gray-900 text-white py-8 mt-auto">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/home" className="hover:underline">Home</Link></li>
              <li><Link to="/about" className="hover:underline">About</Link></li>
              <li><Link to="/copyright" className="hover:underline">Copyright</Link></li>
            </ul>
          </div>
          {user && (
            <div>
              <h3 className="text-lg font-semibold mb-4">User Links</h3>
              <ul className="space-y-2">
                <li><Link to="/profile" className="hover:underline">Profile</Link></li>
                <li><Link to="/favorites" className="hover:underline">Favorites</Link></li>
                <li><Link to="/settings" className="hover:underline">Settings</Link></li>
                {user.role === "business" && (
                  <li><Link to="/my-cards" className="hover:underline">My Cards</Link></li>
                )}
                {user.role === "admin" && (
                  <li><Link to="/crm" className="hover:underline">CRM</Link></li>
                )}
              </ul>
            </div>
          )}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p className="text-sm text-gray-400">
              UserAccessApp
            </p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} UserAccessApp. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
