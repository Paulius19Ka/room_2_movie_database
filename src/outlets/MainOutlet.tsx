import { NavLink, Outlet } from "react-router";
import Footer from "../../src/UI/organisms/Footer";

const MainOutlet = () => {
  return (
    <>
      <header>
        <ul>
          <li><NavLink to='/'>Home</NavLink></li>
          <li><NavLink to='/login'>Login</NavLink></li>
          <li><NavLink to='/register'>Register</NavLink></li>
        </ul>
      </header>
      <main>
        <Outlet />
      </main>
      <Footer /> 
    </>
  );
}
 
export default MainOutlet;