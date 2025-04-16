import { createContext, useEffect, useState } from "react";
import { ChildrenProp, ThemeContextTypes } from "../types";

const ThemeContext = createContext<ThemeContextTypes | undefined>(undefined);
const ThemeProvider = ({ children }: ChildrenProp) => {

  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  
  const themeToggle = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  }

  useEffect(() => {
    document.documentElement.style.setProperty('--text-main', theme === 'dark' ? '#f3f3f3' : '#080808');
    document.documentElement.style.setProperty('--text-secondary', theme === 'dark' ? '#dcdcdc' : '#373737');
    document.documentElement.style.setProperty('--background-main', theme === 'dark' ? '#242424' : '#f3f3f3');
    document.documentElement.style.setProperty('--background-secondary', theme === 'dark' ? '#131313' : '#ffffff');
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        themeToggle
      }}
    >
      { children }
    </ThemeContext.Provider>
  )
}

export { ThemeProvider };
export default ThemeContext;