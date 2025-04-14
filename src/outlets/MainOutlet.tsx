import { NavLink, Outlet } from "react-router";
import styled from "styled-components";

import Footer from "../../src/UI/organisms/Footer";

const StyledMain = styled.main`
  min-height: calc(100vh - 314.34px - 128px);

  @media (min-width: 1024px) {
    min-height: calc(100vh - 335.95px - 128px);
  }
`;

const MainOutlet = () => {
  return (
    <>
      <header>
        <ul>
          <li><NavLink to='/'>Home</NavLink></li>
          <li><NavLink to='/add'>Add</NavLink></li>
          <li><NavLink to='/login'>Login</NavLink></li>
          <li><NavLink to='/register'>Register</NavLink></li>
        </ul>
      </header>
      <StyledMain>
        <Outlet />
      </StyledMain>
      <Footer />
    </>
  );
}

export default MainOutlet;