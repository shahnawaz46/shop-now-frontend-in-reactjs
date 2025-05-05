import { useLayoutEffect, useState } from "react";
import { MdSunny } from "react-icons/md";
import { IoMoon } from "react-icons/io5";

// components
import "./style.css";

const Toggle = () => {
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);

  const handleToggleTheme = () => {
    // setIsDarkTheme((prev) => !prev);
    setIsDarkTheme((prev) => {
      if (prev) {
        document.body.setAttribute("data-theme", "light");
      } else {
        document.body.setAttribute("data-theme", "dark");
      }

      return !prev;
    });
  };

  useLayoutEffect(() => {
    const selectedTheme = document.body.getAttribute("data-theme");
    if (selectedTheme) {
      document.body.setAttribute("data-theme", selectedTheme);
      setIsDarkTheme(selectedTheme === "dark" ? true : false);
    }
  }, []);

  return (
    <div
      className="toggle-container"
      style={{ backgroundColor: isDarkTheme ? "#333333" : "#C7C7C7" }}
    >
      <div
        className="toggle"
        style={{
          transform: isDarkTheme ? "translateX(25px)" : "translateX(0px)",
        }}
        onClick={handleToggleTheme}
      ></div>
      {isDarkTheme ? (
        <IoMoon className="toggle-dark-icon" />
      ) : (
        <MdSunny className="toggle-light-icon" />
      )}
    </div>
  );
};

export default Toggle;
