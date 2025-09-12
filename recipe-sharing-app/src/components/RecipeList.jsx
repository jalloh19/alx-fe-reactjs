import { Link } from 'react-router-dom'
import useRecipeStore from './recipeStore'
import SearchBar from './SearchBar'
import AdvancedFilters from './AdvancedFilters'

const RecipeCard = ({ recipe }) => {
  const toggleFavorite = useRecipeStore(state => state.toggleFavorite)
  const isFavorite = useRecipeStore(state => state.isFavorite(recipe.id))

  return (
    <div className="recipe-card">
      <button
        onClick={() => toggleFavorite(recipe.id)}
        className={`favorite-btn ${isFavorite ? 'favorited' : ''}`}
        title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        {isFavorite ? '❤️' : '🤍'}
      </button>
      
      <Link to={`/recipe/${recipe.id}`} className="recipe-link">
        <h3>{recipe.title}</h3>
        <p>{recipe.description.length > 100 
          ? `${recipe.description.substring(0, 100)}...` 
          : recipe.description}</p>
        
        <div className="recipe-meta">
          {recipe.prepTime && (
            <span className="prep-time">⏱️ {recipe.prepTime} min</span>
          )}
          {recipe.category && (
            <span className="category">{recipe.category}</span>
          )}
          {recipe.difficulty && (
            <span className={`difficulty ${recipe.difficulty.toLowerCase()}`}>
              {recipe.difficulty}
            </span>
          )}
        </div>
      </Link>
    </div>
  )
}

const RecipeList = () => {
  const recipes = useRecipeStore(state => state.recipes)
  const filteredRecipes = useRecipeStore(state => state.filteredRecipes)
  const searchTerm = useRecipeStore(state => state.searchTerm)
  const filters = useRecipeStore(state => state.filters)

  const isFiltered = searchTerm || Object.values(filters).some(value => value !== '')
  const displayedRecipes = isFiltered ? filteredRecipes : recipes

  return (
    <div className="recipe-list">
      <h2>Recipes</h2>
      
      <div className="filters-section">
        <SearchBar />
        <AdvancedFilters />
      </div>

      {isFiltered && (
        <div className="results-info">
          <p>
            Showing {displayedRecipes.length} of {recipes.length} recipes
            {searchTerm && ` matching "${searchTerm}"`}
          </p>
        </div>
      )}

      {displayedRecipes.length === 0 ? (
        <div className="no-results">
          <p>No recipes found{isFiltered ? ' matching your criteria' : ''}.</p>
          {isFiltered && (
            <p>Try adjusting your search or filters.</p>
          )}
        </div>
      ) : (
        <div className="recipes-grid">
          {displayedRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  )
}

export default RecipeList