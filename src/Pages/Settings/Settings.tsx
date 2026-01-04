import { useEffect, useState } from "react";

const Settings = () => {
  const defaultSettings = {
    language: "he",
    fontSize: "normal",
    notifications: true,
  };

  const [language, setLanguage] = useState(() => localStorage.getItem("language") || defaultSettings.language);
  const [fontSize, setFontSize] = useState(() => localStorage.getItem("fontSize") || defaultSettings.fontSize);
  const [notifications, setNotifications] = useState(() =>
    JSON.parse(localStorage.getItem("notifications") || JSON.stringify(defaultSettings.notifications))
  );

  const [tempLanguage, setTempLanguage] = useState(language);
  const [tempFontSize, setTempFontSize] = useState(fontSize);
  const [tempNotifications, setTempNotifications] = useState(notifications);

  useEffect(() => {
    document.body.style.fontSize =
      fontSize === "large" ? "18px" :
      fontSize === "small" ? "14px" :
      "16px";
  }, [fontSize]);

  const handleApply = () => {
    setLanguage(tempLanguage);
    setFontSize(tempFontSize);
    setNotifications(tempNotifications);
    localStorage.setItem("language", tempLanguage);
    localStorage.setItem("fontSize", tempFontSize);
    localStorage.setItem("notifications", JSON.stringify(tempNotifications));
  };

  const handleReset = () => {
    setTempLanguage(defaultSettings.language);
    setTempFontSize(defaultSettings.fontSize);
    setTempNotifications(defaultSettings.notifications);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white px-6 py-10 transition-colors duration-300">
      <div className="max-w-4xl mx-auto space-y-10">
        <h1 className="text-4xl font-bold mb-8">הגדרות משתמש מתקדמות</h1>
        <section>
          <h2 className="text-2xl font-semibold mb-4">שפה 🌐</h2>
          <select
            value={tempLanguage}
            onChange={(e) => setTempLanguage(e.target.value)}
            className="p-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700"
          >
            <option value="he">עברית</option>
            <option value="en">English</option>
            <option value="ru">Русский</option>
          </select>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-4">גודל טקסט 📏</h2>
          <div className="flex gap-4">
            {["small", "normal", "large"].map((size) => (
              <button
                key={size}
                onClick={() => setTempFontSize(size)}
                className={`px-5 py-2 rounded-lg border ${
                  tempFontSize === size
                    ? "bg-blue-600 text-white"
                    : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700"
                }`}
              >
                {size === "small" ? "קטן" : size === "normal" ? "רגיל" : "גדול"}
              </button>
            ))}
          </div>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-4">התראות 🔔</h2>
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={tempNotifications}
              onChange={() => setTempNotifications((prev: boolean) => !prev)}
              className="h-5 w-5 accent-blue-600 cursor-pointer"
            />
            <span className="ml-2">אפשר קבלת התראות למייל ולטלפון</span>
          </label>
        </section>
        <div className="flex gap-4 pt-8">
          <button
            onClick={handleApply}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
          >
            אישור הגדרות ✅
          </button>
          <button
            onClick={handleReset}
            className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition"
          >
            איפוס לברירת מחדל 🔄
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
