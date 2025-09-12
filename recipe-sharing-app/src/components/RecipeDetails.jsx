import { useParams, Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import useRecipeStore from './recipeStore'
import EditRecipeForm from './EditRecipeForm'
import DeleteRecipeButton from './DeleteRecipeButton'

const RecipeDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const recipeId = parseInt(id)
  const recipe = useRecipeStore(state =>
    state.recipes.find(recipe => recipe.id === recipeId)
  )
  const [showEditForm, setShowEditForm] = useState(false)
  const toggleFavorite = useRecipeStore(state => state.toggleFavorite)
  const isFavorite = useRecipeStore(state => state.isFavorite(recipeId))

  if (!recipe) {
    return (
      <div className="recipe-details">
        <div className="error-state">
          <h2>Recipe Not Found</h2>
          <p>The recipe you're looking for doesn't exist or may have been deleted.</p>
          <Link to="/" className="back-link">← Back to All Recipes</Link>
        </div>
      </div>
    )
  }

  const handleEditSuccess = () => {
    setShowEditForm(false)
  }

  const handleDeleteSuccess = () => {
    navigate('/')
  }

  const handleToggleFavorite = () => {
    toggleFavorite(recipeId)
  }

  return (
    <div className="recipe-details">
      {/* Navigation */}
      <div className="navigation-header">
        <Link to="/" className="back-link">← Back to All Recipes</Link>
        <div className="action-buttons">
          <button 
            onClick={() => setShowEditForm(!showEditForm)}
            className="edit-toggle-btn"
          >
            {showEditForm ? '❌ Cancel Edit' : '✏️ Edit Recipe'}
          </button>
          <DeleteRecipeButton recipeId={recipe.id} onDelete={handleDeleteSuccess} />
        </div>
      </div>

      {/* Edit Form Overlay */}
      {showEditForm && (
        <div className="edit-form-container">
          <EditRecipeForm 
            recipe={recipe} 
            onSuccess={handleEditSuccess}
            onCancel={() => setShowEditForm(false)}
          />
        </div>
      )}

      {/* Recipe Content */}
      <div className="recipe-content">
        <div className="recipe-header">
          <div className="recipe-title-section">
            <h1>{recipe.title}</h1>
            <button
              onClick={handleToggleFavorite}
              className={`favorite-btn large ${isFavorite ? 'favorited' : ''}`}
              title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              {isFavorite ? '❤️ Added to Favorites' : '🤍 Add to Favorites'}
            </button>
          </div>
          
          <div className="recipe-meta-header">
            {recipe.prepTime && (
              <span className="prep-time-badge">⏱️ {recipe.prepTime} minutes</span>
            )}
            {recipe.ingredients && (
              <span className="ingredients-badge">🛒 {recipe.ingredients.length} ingredients</span>
            )}
            {recipe.category && (
              <span className="category-badge">🏷️ {recipe.category}</span>
            )}
            {recipe.difficulty && (
              <span className={`difficulty-badge ${recipe.difficulty.toLowerCase()}`}>
                ⚡ {recipe.difficulty}
              </span>
            )}
            <span className="date-created">📅 Created: {new Date(recipe.id).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Description */}
        <div className="description-section">
          <h3>Description</h3>
          <p className="recipe-description">{recipe.description}</p>
        </div>

        {/* Preparation Time */}
        {recipe.prepTime && (
          <div className="detail-section">
            <h3>⏱️ Preparation Time</h3>
            <p className="prep-time-detail">{recipe.prepTime} minutes</p>
          </div>
        )}

        {/* Ingredients */}
        {recipe.ingredients && recipe.ingredients.length > 0 && (
          <div className="detail-section">
            <h3>🛒 Ingredients</h3>
            <ul className="ingredients-list">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="ingredient-item">
                  <span className="ingredient-bullet">•</span>
                  <span className="ingredient-text">{ingredient}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Instructions (placeholder for future enhancement) */}
        <div className="detail-section">
          <h3>📝 Instructions</h3>
          <p className="instructions-placeholder">
            Instructions feature coming soon! This is where step-by-step cooking directions would appear.
          </p>
        </div>

        {/* Nutritional Info (placeholder for future enhancement) */}
        <div className="detail-section">
          <h3>📊 Nutritional Information</h3>
          <p className="nutrition-placeholder">
            Nutritional information feature coming soon! This is where calorie count and macronutrients would be displayed.
          </p>
        </div>

        {/* Recipe Actions Footer */}
        <div className="recipe-actions-footer">
          <button 
            onClick={() => setShowEditForm(true)}
            className="action-btn edit-btn"
          >
            ✏️ Edit Recipe
          </button>
          
          <button
            onClick={handleToggleFavorite}
            className={`action-btn favorite-action-btn ${isFavorite ? 'favorited' : ''}`}
          >
            {isFavorite ? '❤️ Remove Favorite' : '🤍 Add to Favorites'}
          </button>
          
          <DeleteRecipeButton recipeId={recipe.id} onDelete={handleDeleteSuccess} />
          
          <button className="action-btn share-btn">
            📤 Share Recipe
          </button>
          
          <button className="action-btn print-btn">
            🖨️ Print Recipe
          </button>
        </div>
      </div>
    </div>
  )
}

export default RecipeDetails