import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Laboratorio from './pages/Laboratorio'
import Comparacion from './pages/Comparacion'
import Teoria from './pages/Teoria'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/laboratorio" element={<Laboratorio />} />
        <Route path="/comparacion" element={<Comparacion />} />
        <Route path="/teoria" element={<Teoria />} />
      </Routes>
    </Router>
  )
}

export default App
