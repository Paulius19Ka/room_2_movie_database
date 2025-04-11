import { Outlet } from "react-router";

const MainOutlet = () => {
  return (
    <>
      <header>
        <ul>
          <li>Home</li>
          <li>Home</li>
          <li>Home</li>
          <li>Home</li>
          <li>Home</li>
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