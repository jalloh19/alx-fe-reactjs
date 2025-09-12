import { Link } from 'react-router-dom'
import useRecipeStore from './recipeStore'

const FavoritesList = () => {
  const favorites = useRecipeStore(state => 
    state.favorites.map(id => state.recipes.find(recipe => recipe.id === id))
  )
  const toggleFavorite = useRecipeStore(state => state.toggleFavorite)

  if (favorites.length === 0) {
    return (
      <div className="favorites-list">
        <h2>❤️ My Favorites</h2>
        <div className="empty-state">
          <p>You haven't added any favorites yet!</p>
          <p>Click the heart icon on any recipe to add it to your favorites.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="favorites-list">
      <h2>❤️ My Favorites ({favorites.length})</h2>
      <div className="favorites-grid">
        {favorites.map((recipe) => (
          <div key={recipe.id} className="favorite-card">
            <Link to={`/recipe/${recipe.id}`} className="recipe-link">
              <h3>{recipe.title}</h3>
              <p>{recipe.description}</p>
              <div className="recipe-meta">
                {recipe.prepTime && (
                  <span className="prep-time">⏱️ {recipe.prepTime} min</span>
                )}
                {recipe.category && (
                  <span className="category">{recipe.category}</span>
                )}
              </div>
            </Link>
            <button
              onClick={() => toggleFavorite(recipe.id)}
              className="remove-favorite-btn"
              title="Remove from favorites"
            >
              ❌ Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FavoritesList