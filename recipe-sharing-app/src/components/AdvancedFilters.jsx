import useRecipeStore from './recipeStore'

const AdvancedFilters = () => {
  const filters = useRecipeStore(state => state.filters)
  const setFilter = useRecipeStore(state => state.setFilter)
  const clearFilters = useRecipeStore(state => state.clearFilters)

  return (
    <div className="advanced-filters">
      <h3>Advanced Filters</h3>
      
      <div className="filter-group">
        <label htmlFor="ingredients-filter">Ingredients:</label>
        <input
          id="ingredients-filter"
          type="text"
          placeholder="Filter by ingredients..."
          value={filters.ingredients}
          onChange={(e) => setFilter('ingredients', e.target.value)}
          className="filter-input"
        />
      </div>

      <div className="filter-group">
        <label>Preparation Time (minutes):</label>
        <div className="time-filters">
          <input
            type="number"
            placeholder="Min"
            value={filters.minTime}
            onChange={(e) => setFilter('minTime', e.target.value)}
            className="time-input"
            min="0"
          />
          <span>to</span>
          <input
            type="number"
            placeholder="Max"
            value={filters.maxTime}
            onChange={(e) => setFilter('maxTime', e.target.value)}
            className="time-input"
            min="0"
          />
        </div>
      </div>

      <button onClick={clearFilters} className="clear-filters-btn">
        🗑️ Clear All Filters
      </button>
    </div>
  )
}

export default AdvancedFilters