import { useState } from 'react'
import Matematicas from './pages/Matematicas.jsx'
import Resultados from './pages/Resultados'
import { BrowserRouter, Route, Routes } from "react-router-dom";



function App() {

  return (
    
    <>
     <BrowserRouter basename="/study">
          <Routes>
            <Route path="/matematicas" element={<Matematicas />} />
            <Route path="/resultados" element={<Resultados />} />
          </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
