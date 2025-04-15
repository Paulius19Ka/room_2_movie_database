import styled from "styled-components";
import { NavLink as RouterLink } from "react-router";
import { useContext } from "react";
import UsersContext from "../../contexts/UsersContext";
// import { User } from "../../types";

const HeaderWrapper = styled.header`
  background-color: #121212;
  color: white;
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const DesktopSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileSection = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    width: 100%;
    gap: 0.5rem;
  }
`;

const Logo = styled(RouterLink)`
  background-color: #f5c518;
  color: black;
  font-weight: bold;
  padding: 0.2rem 0.5rem;
  text-decoration: none;
  font-size: 1.2rem;
  border-radius: 4px;
`;

const NavLink = styled(RouterLink)`
  color: white;
  text-decoration: none;

  &:visited {
    color: white;
  }

  &:hover {
    text-decoration: underline;
  }
`;

const IconButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 0.3rem;
  display: flex;
  align-items: center;

  img {
    width: 24px;
    height: 24px;
  }
`;

const FlexGrow = styled.div`
  flex-grow: 1;
`;

const UseAppButton = styled(RouterLink)`
  background-color: #f5c518;
  color: black;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  text-decoration: none;
  font-weight: bold;
  font-size: 0.9rem;
  white-space: nowrap;
`;

const Avatar = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  img {
    border-radius: 50%;
    width: 28px;
    height: 28px;
  }
`;

const Header = ({ onThemeToggle }: { onThemeToggle: () => void }) => {
  const { loggedInUser } = useContext(UsersContext)!;

  const isLoggedIn = !!loggedInUser;
  // const isAdmin = loggedInUser?.role === "admin";

  return (
    <HeaderWrapper>
      {/* Desktop */}
      <DesktopSection>
        <Logo to="/">IMDb</Logo>
        <span>☰ Menu</span>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "white",
            borderRadius: "6px",
            overflow: "hidden",
            height: "40px",
          }}
        >
          <select
            style={{
              border: "none",
              padding: "0 0.8rem",
              fontWeight: "bold",
              borderRight: "1px solid #ccc",
              height: "100%",
            }}
          >
            <option>All</option>
          </select>
          <input
            type="text"
            placeholder="Search IMDb"
            disabled
            style={{
              border: "none",
              padding: "0 1rem",
              width: "540px",
              backgroundColor: "white",
              color: "black",
              fontSize: "1rem",
              height: "100%",
              outline: "none",
            }}
          />
        </div>

        <img
          src="https://m.media-amazon.com/images/G/01/IMDbPro/images/IMDbPro_brand_logo_small._SL1280_FMpng_.png"
          alt="IMDbPro"
          style={{ height: "50px", cursor: "pointer" }}
        />

        {/* Admin: AddNewMovie */}
        {/* {isLoggedIn && isAdmin && <NavLink to="/add">➕ AddNewMovie</NavLink>} */}
        {
          loggedInUser?.role === 'admin' ?
          <NavLink to="/add">➕ AddNewMovie</NavLink> :
          <></>
        }
        {/* User or guest: Watchlist */}
        {/* {!isAdmin && (
          <NavLink to={isLoggedIn ? "/user" : "/login"}>📄 Watchlist</NavLink>
        )} */}
        <NavLink to={isLoggedIn ? "/user" : "/login"}>📄 Watchlist</NavLink>
        {/* Guest: Sign In / Register */}
        {!isLoggedIn ? (
          <>
            <NavLink to="/login">Sign In</NavLink>
            <NavLink to="/register">Register</NavLink>
          </>
        ) : (
          <Avatar>
            {
              loggedInUser.profilePicture ?
              <img src={loggedInUser.profilePicture} alt={loggedInUser.username} /> :
              <img src="https://i.pravatar.cc/150?u=user" alt="default avatar" />
            }
            <span>{loggedInUser.username}</span>
          </Avatar>
        )}

        <IconButton onClick={onThemeToggle}>🌓</IconButton>
      </DesktopSection>

      {/* Mobile */}
      <MobileSection>
        <IconButton>
          <span style={{ fontSize: "1.4rem" }}>☰</span>
        </IconButton>

        <Logo to="/">IMDb</Logo>

        <FlexGrow />

        <IconButton>
          <img
            src="https://img.icons8.com/ios-glyphs/30/ffffff/search--v1.png"
            alt="Search"
          />
        </IconButton>

        {
          loggedInUser ?
          <Avatar>
            {
              loggedInUser.profilePicture ?
              <img src={loggedInUser.profilePicture} alt={loggedInUser.username} /> :
              <img src="https://i.pravatar.cc/150?u=user" alt="default avatar" />
            }
            <span>{loggedInUser.username}</span>
          </Avatar> :
          <NavLink to="/login">Sign In</NavLink>
        }

        <UseAppButton to="/app">Use App</UseAppButton>
      </MobileSection>
    </HeaderWrapper>
  );
};

export default Header;

