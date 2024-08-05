import { Routes, Route } from "react-router-dom"
import Home from "./components/Home"
import About from "./components/About"
import Create from "./components/Create"
import NavBar from "./components/NavBar"
import Edit from "./components/Edit"
import Delete from "./components/Delete"
// import './App.css'

function App() {

  return (
    <>
      <NavBar drawerWidth = {220}
        content = {
          <Routes>
            <Route path="" element={<Home/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/create" element={<Create/>}/>
            <Route path="/edit/:id" element={<Edit/>}/>
            <Route path="/delete/:id" element={<Delete/>}/>
          </Routes>
        }
      />
      
    </>
  )
}

export default App
