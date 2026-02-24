import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import Home from './pages/Home'
import Results from './pages/Results'
import Item from './pages/Item'
import Library from './pages/Library'
import Libraries from './pages/Libraries'
import CategoryItems from './pages/CategoryItems'
import Profile from './pages/Profile'
import Discover from './pages/Discover'

function App() {
  return (
    <Router>
      <div className="app">
        <Navigation />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/discover" element={<Discover />} />
            <Route path="/results" element={<Results />} />
            <Route path="/item/:id" element={<Item />} />
            <Route path="/library/:id/category/:category" element={<CategoryItems />} />
            <Route path="/library/:id" element={<Library />} />
            <Route path="/libraries" element={<Libraries />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
