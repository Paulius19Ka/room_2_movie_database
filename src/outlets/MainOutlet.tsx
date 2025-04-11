import { NavLink, Outlet } from "react-router";

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
      <footer>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugiat, magni?
        </p>
      </footer>
    </>
  );
}
 
export default MainOutlet;