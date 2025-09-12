import { useState } from 'react'
import useRecipeStore from './recipeStore'

const AddRecipeForm = () => {
  const addRecipe = useRecipeStore(state => state.addRecipe)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [prepTime, setPrepTime] = useState('')
  const [ingredients, setIngredients] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    
    if (!title.trim() || !description.trim()) {
      alert('Please fill in at least title and description')
      return
    }
    
    const ingredientsArray = ingredients.split(',')
      .map(ingredient => ingredient.trim())
      .filter(ingredient => ingredient.length > 0)

    addRecipe({ 
      title, 
      description, 
      prepTime: prepTime ? parseInt(prepTime) : undefined,
      ingredients: ingredientsArray.length > 0 ? ingredientsArray : undefined
    })
    
    setTitle('')
    setDescription('')
    setPrepTime('')
    setIngredients('')
  }

  return (
    <form onSubmit={handleSubmit} className="recipe-form">
      <h2>Add New Recipe</h2>
      
      <div className="form-group">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Recipe Title *"
          className="form-input"
          required
        />
      </div>
      
      <div className="form-group">
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Recipe Description *"
          className="form-textarea"
          required
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <input
            type="number"
            value={prepTime}
            onChange={(e) => setPrepTime(e.target.value)}
            placeholder="Preparation Time (minutes)"
            className="form-input"
            min="0"
          />
        </div>
        
        <div className="form-group">
          <input
            type="text"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="Ingredients (comma-separated)"
            className="form-input"
          />
        </div>
      </div>
      
      <button type="submit" className="submit-btn">
        Add Recipe
      </button>
    </form>
  )
}

export default AddRecipeForm