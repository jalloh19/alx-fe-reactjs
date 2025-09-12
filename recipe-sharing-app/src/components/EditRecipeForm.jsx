import { useState } from 'react'
import useRecipeStore from './recipeStore'

const EditRecipeForm = ({ recipe }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(recipe.title)
  const [description, setDescription] = useState(recipe.description)
  const updateRecipe = useRecipeStore(state => state.updateRecipe)

  const handleSubmit = (event) => {
    event.preventDefault() // This was missing!
    
    if (!title.trim() || !description.trim()) {
      alert('Please fill in all fields')
      return
    }
    
    updateRecipe(recipe.id, { title, description })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setTitle(recipe.title)
    setDescription(recipe.description)
    setIsEditing(false)
  }

  if (!isEditing) {
    return (
      <button 
        onClick={() => setIsEditing(true)}
        className="edit-btn"
      >
        ✏️ Edit Recipe
      </button>
    )
  }

  return (
    <div className="edit-form-overlay">
      <div className="edit-form">
        <h3>Edit Recipe</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Recipe Title"
              className="form-input"
              required
            />
          </div>
          
          <div className="form-group">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Recipe Description"
              className="form-textarea"
              required
            />
          </div>
          
          <div className="form-actions">
            <button type="submit" className="save-btn">💾 Save</button>
            <button type="button" onClick={handleCancel} className="cancel-btn">❌ Cancel</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditRecipeForm