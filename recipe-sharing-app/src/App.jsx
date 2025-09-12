import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AddRecipeForm from './components/AddRecipeForm'
import RecipeList from './components/RecipeList'
import RecipeDetails from './components/RecipeDetails'
import FavoritesList from './components/FavoritesList'
import RecommendationsList from './components/RecommendationsList'
import NotFound from './components/NotFound'
import './App.css'

function App() {
  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <h1>🍳 Recipe Sharing App</h1>
          <p>Share and discover delicious recipes</p>
        </header>
        
        <main className="app-main">
          <Routes>
            <Route path="/" element={
              <>
                <AddRecipeForm />
                <RecommendationsList />
                <RecipeList />
              </>
            } />
            <Route path="/recipe/:id" element={<RecipeDetails />} />
            <Route path="/favorites" element={
              <>
                <FavoritesList />
                <RecommendationsList />
              </>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <nav className="bottom-nav">
          <a href="/" className="nav-link">🏠 All Recipes</a>
          <a href="/favorites" className="nav-link">❤️ Favorites</a>
        </nav>
      </div>
    </Router>
  )
}

export default App
