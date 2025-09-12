import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useRecipeStore from './recipeStore'

const DeleteRecipeButton = ({ recipeId }) => {
  const [showConfirm, setShowConfirm] = useState(false)
  const deleteRecipe = useRecipeStore(state => state.deleteRecipe)
  const navigate = useNavigate()

  const handleDelete = () => {
    deleteRecipe(recipeId)
    setShowConfirm(false)
    navigate('/') // Redirect to home after deletion
  }

  return (
    <div className="delete-container">
      <button 
        onClick={() => setShowConfirm(true)}
        className="delete-btn"
      >
        🗑️ Delete Recipe
      </button>
      
      {showConfirm && (
        <div className="confirm-overlay">
          <div className="confirm-dialog">
            <h3>Confirm Deletion</h3>
            <p>Are you sure you want to delete this recipe? This action cannot be undone.</p>
            <div className="confirm-actions">
              <button onClick={handleDelete} className="confirm-delete-btn">
                ✅ Yes, Delete
              </button>
              <button onClick={() => setShowConfirm(false)} className="cancel-delete-btn">
                ❌ Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DeleteRecipeButton