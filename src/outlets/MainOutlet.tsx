import { Outlet } from "react-router";
import styled from "styled-components";

import Footer from "../../src/UI/organisms/Footer";
import Header from "../UI/organisms/Header";

const StyledMain = styled.main`
  min-height: calc(100vh - 314.34px - 128px);

  margin: 10px 20px;

  @media (min-width: 1024px) {
    min-height: calc(100vh - 335.95px - 128px);

    margin: 10px 40px;
  }
`;

const MainOutlet = () => {
  return (
    <>
      <Header onThemeToggle={() => {}} />
      <StyledMain>
        <Outlet />
      </StyledMain>
      <Footer />
    </>
  );
}

export default MainOutlet;