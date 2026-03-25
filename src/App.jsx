import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
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
import Shelves from './pages/Shelves/Shelves'
import BookDetail from './pages/BookDetail/BookDetail'
import UserProfile from './pages/UserProfile/UserProfile'

function App() {
  return (
    <AuthProvider>
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
              <Route path="/shelves" element={<Shelves />} />
              <Route path="/book/:bookId" element={<BookDetail />} />
              <Route path="/user/:username" element={<UserProfile />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
