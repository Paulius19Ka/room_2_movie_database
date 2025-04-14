import { Route, Routes } from "react-router"

import MainOutlet from "./outlets/MainOutlet"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import AddMovie from "./pages/AddMovie"
import EditMovie from "./pages/EditMovie"

const App = () => {


  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="" element={<MainOutlet />}>
          <Route index element={<Home />} />
          <Route path="/add" element={<AddMovie />} />
          <Route path="edit/:id" element={<EditMovie />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
