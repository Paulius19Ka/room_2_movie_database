import { NavLink, Outlet } from "react-router";
import Footer from "../../src/UI/organisms/Footer";
import Header from "../UI/organisms/Header";

const MainOutlet = () => {
  return (
    <>
    < Header
  isLoggedIn={true}
  isAdmin={false}
  userName="John Doe"
  userAvatarUrl="https://i.pravatar.cc/300"
  onThemeToggle={() => console.log("toggle theme")}
/>
      <main>
        <Outlet />
      </main>
      <Footer /> 
    </>
  );
}
 
export default MainOutlet;