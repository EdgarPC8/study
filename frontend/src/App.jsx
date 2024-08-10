import { useState } from 'react'
import Matematicas from './pages/Matematicas.jsx'
import Resultados from './pages/Resultados'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from './components/NavBar.jsx';



function App() {

  return (
    
    <>
     <BrowserRouter basename="/study">
     <NavBar/>
          <Routes>
            <Route path="/matematicas" element={<Matematicas />} />
            <Route path="/resultados" element={<Resultados />} />
          </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
