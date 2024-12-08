import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import PlantsPage from './pages/PlantsPage'
import Fleurs from './pages/Fleurs'
import Compte from './pages/Compte'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import FetchPlants from './components/FetchPlants'
import Login from './pages/Login'
import CartPage from './pages/CartPage'

function App() {
  return (
    <>
      <FetchPlants />

      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/plants" element={<PlantsPage />} />
          <Route path="/fleurs" element={<Fleurs />} />
          <Route path="/compte" element={<Compte />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
        <Footer />
      </Router>
    </>
  )
}

export default App
