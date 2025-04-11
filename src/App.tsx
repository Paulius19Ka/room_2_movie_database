import { Route, Routes } from "react-router"

import MainOutlet from "./outlets/MainOutlet"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"

const App = () => {


  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="" element={<MainOutlet />}>
          <Route index element={<Home />} />
          <Route />
        </Route>
      </Routes>
    </>
  )
}

export default App
