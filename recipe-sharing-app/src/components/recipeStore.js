import { create } from 'zustand'

const useRecipeStore = create((set, get) => ({
  recipes: [
    {
      id: 1,
      title: "Classic Spaghetti Carbonara",
      description: "Creamy Italian pasta dish with eggs, cheese, and pancetta",
      prepTime: 25,
      ingredients: ["spaghetti", "eggs", "pecorino cheese", "pancetta", "black pepper"],
      category: "Italian",
      difficulty: "Medium"
    },
    {
      id: 2,
      title: "Chocolate Chip Cookies",
      description: "Soft and chewy cookies with chocolate chips",
      prepTime: 30,
      ingredients: ["flour", "butter", "sugar", "chocolate chips", "vanilla"],
      category: "Dessert",
      difficulty: "Easy"
    },
    {
      id: 3,
      title: "Vegetable Stir Fry",
      description: "Healthy and colorful vegetable stir fry with tofu",
      prepTime: 20,
      ingredients: ["tofu", "broccoli", "carrots", "bell peppers", "soy sauce"],
      category: "Asian",
      difficulty: "Easy"
    },
    {
      id: 4,
      title: "Beef Lasagna",
      description: "Layered pasta with beef, cheese, and tomato sauce",
      prepTime: 60,
      ingredients: ["lasagna sheets", "ground beef", "tomato sauce", "ricotta", "mozzarella"],
      category: "Italian",
      difficulty: "Hard"
    },
    {
      id: 5,
      title: "Fruit Smoothie Bowl",
      description: "Refreshing smoothie bowl topped with fresh fruits",
      prepTime: 15,
      ingredients: ["banana", "berries", "yogurt", "granola", "honey"],
      category: "Breakfast",
      difficulty: "Easy"
    }
  ],
  
  // Favorites functionality
  favorites: [],
  
  addFavorite: (recipeId) => 
    set((state) => ({ 
      favorites: [...state.favorites, recipeId] 
    })),
  
  removeFavorite: (recipeId) =>
    set((state) => ({
      favorites: state.favorites.filter(id => id !== recipeId)
    })),
  
  toggleFavorite: (recipeId) =>
    set((state) => {
      const isFavorite = state.favorites.includes(recipeId)
      if (isFavorite) {
        return { favorites: state.favorites.filter(id => id !== recipeId) }
      } else {
        return { favorites: [...state.favorites, recipeId] }
      }
    }),
  
  isFavorite: (recipeId) => {
    return get().favorites.includes(recipeId)
  },
  
  // Recommendations functionality
  recommendations: [],
  
  generateRecommendations: () =>
    set((state) => {
      if (state.favorites.length === 0) {
        // If no favorites, show random popular recipes
        const popularRecipes = [...state.recipes]
          .sort(() => Math.random() - 0.5)
          .slice(0, 3)
        return { recommendations: popularRecipes }
      }
      
      // Get categories from favorite recipes
      const favoriteCategories = state.favorites.map(favId => {
        const recipe = state.recipes.find(r => r.id === favId)
        return recipe?.category
      }).filter(Boolean)
      
      // Get difficulty levels from favorite recipes
      const favoriteDifficulties = state.favorites.map(favId => {
        const recipe = state.recipes.find(r => r.id === favId)
        return recipe?.difficulty
      }).filter(Boolean)
      
      // Generate recommendations based on preferences
      const recommendedRecipes = state.recipes
        .filter(recipe => !state.favorites.includes(recipe.id)) // Exclude favorites
        .filter(recipe => 
          favoriteCategories.includes(recipe.category) ||
          favoriteDifficulties.includes(recipe.difficulty)
        )
        .sort(() => Math.random() - 0.5) // Shuffle
        .slice(0, 3) // Top 3 recommendations
      
      return { recommendations: recommendedRecipes }
    }),
  
  // Search and filtering (existing functionality)
  searchTerm: '',
  setSearchTerm: (term) => set({ searchTerm: term }),
  
  filters: {
    ingredients: '',
    minTime: '',
    maxTime: '',
    category: '',
    difficulty: ''
  },
  
  setFilter: (filterType, value) => 
    set((state) => ({
      filters: { ...state.filters, [filterType]: value }
    })),
  
  clearFilters: () => set({ 
    searchTerm: '',
    filters: {
      ingredients: '',
      minTime: '',
      maxTime: '',
      category: '',
      difficulty: ''
    }
  }),
  
  // Computed filtered recipes
  get filteredRecipes() {
    const { recipes, searchTerm, filters } = get()
    
    return recipes.filter(recipe => {
      // Search term filter
      const matchesSearch = searchTerm === '' || 
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.description.toLowerCase().includes(searchTerm.toLowerCase())
      
      // Category filter
      const matchesCategory = filters.category === '' ||
        recipe.category === filters.category
      
      // Difficulty filter
      const matchesDifficulty = filters.difficulty === '' ||
        recipe.difficulty === filters.difficulty
      
      // Preparation time filter
      const matchesTime = (!filters.minTime || recipe.prepTime >= parseInt(filters.minTime)) &&
                         (!filters.maxTime || recipe.prepTime <= parseInt(filters.maxTime))
      
      return matchesSearch && matchesCategory && matchesDifficulty && matchesTime
    })
  }
}))

export default useRecipeStore