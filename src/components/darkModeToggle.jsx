import { useEffect, useState } from "react";

const DarkModeToggle = () => {
  // State to track dark mode
  const [isDark, setIsDark] = useState(
    localStorage.getItem("darkMode") === "true" || false
  );

  // Toggle function
  const toggleDarkMode = () => {
    setIsDark(!isDark);
  };

  // Apply dark mode class and persist preference
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("darkMode", isDark);
  }, [isDark]);

  return (
    <button
      onClick={toggleDarkMode}
      className="px-4 py-2 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded"
    >
      {isDark ? "☀️ Light Mode" : "🌙 Dark Mode"}
    </button>
  );
};

export default DarkModeToggle;
