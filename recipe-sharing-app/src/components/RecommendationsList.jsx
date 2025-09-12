import { Link } from 'react-router-dom'
import useRecipeStore from './recipeStore'
import { useEffect } from 'react'

const RecommendationsList = () => {
  const recommendations = useRecipeStore(state => state.recommendations)
  const generateRecommendations = useRecipeStore(state => state.generateRecommendations)
  const favorites = useRecipeStore(state => state.favorites)

  useEffect(() => {
    generateRecommendations()
  }, [favorites, generateRecommendations])

  if (recommendations.length === 0) {
    return null
  }

  return (
    <div className="recommendations-list">
      <h2>🌟 Recommended For You</h2>
      <p className="recommendations-subtitle">
        Based on your favorite recipes and preferences
      </p>
      <div className="recommendations-grid">
        {recommendations.map((recipe) => (
          <div key={recipe.id} className="recommendation-card">
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
                {recipe.difficulty && (
                  <span className={`difficulty ${recipe.difficulty.toLowerCase()}`}>
                    {recipe.difficulty}
                  </span>
                )}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RecommendationsList