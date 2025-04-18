import { Navigate, Route, Routes } from "react-router"

import MainOutlet from "./outlets/MainOutlet"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import AddMovie from "./pages/AddMovie"
import EditMovie from "./pages/EditMovie"
import Watchlist from "./pages/Watchlist"
import SpecificMoviePage from "./pages/SpecificMoviePage"
import { useContext } from "react"
import UsersContext from "./contexts/UsersContext"
import { UsersContextTypes } from "./types"
import Credits from "./pages/Credits"

const App = () => {

  const { loggedInUser } = useContext(UsersContext) as UsersContextTypes;

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="" element={<MainOutlet />}>
          <Route index element={<Home />} />
          <Route path="/add" element={loggedInUser?.role === 'admin' ? <AddMovie /> : <Navigate to='/' replace />} />
          <Route path="edit/:id" element={loggedInUser?.role === 'admin' ? <EditMovie /> : <Navigate to='/' replace />} />
          <Route path="/watchlist" element={loggedInUser ? <Watchlist /> : <Navigate to='/' replace />} />
          <Route path=":id" element={<SpecificMoviePage />} />
          <Route path=":id/credits" element={<Credits />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
