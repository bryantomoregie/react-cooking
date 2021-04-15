import React, {useState, useEffect} from 'react'
import RecipeList from './RecipeList'
import RecipeEdit from './RecipeEdit'
import '../css/app.css'
import { v4 as uuidv4 } from 'uuid';

const LOCAL_STORAGE_KEY = 'cookingReact.Recipes'

function App() {
  const [selectedRecipeId, setSelectedRecipeid] = useState()
  const [recipes, setRecipes] = useState(sampleRecipes)
  const selectedRecipe = recipes.find(recipe => recipe.id === selectedRecipeId)

  useEffect(() => {
    const recipesJson = localStorage.getItem(LOCAL_STORAGE_KEY)
    if(recipesJson != null) setRecipes(JSON.parse(recipesJson))
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recipes))
  }, [recipes])


  function handleRecipeAdd(){
    const newRecipe = {
      id: uuidv4(),
      name: 'New',
      servings: 2, 
      cookTime: '1:00',
      instructions: 'instr',
      ingredients: [{
        id: uuidv4(), 
        name: 'Name',
        amount: '1 tbs'
      }]
    }
    setRecipes([...recipes, newRecipe])
}

function handleRecipeDelete(id){
   setRecipes(recipes.filter(recipe => recipe.id != id))
}

  return (
    <>
    <RecipeList
    recipes={recipes}
    handleRecipeAdd={handleRecipeAdd}
    handleRecipeDelete={handleRecipeDelete}
    />
    <RecipeEdit/>
    </>
  )
}



const sampleRecipes = [
  {
    id: 1,
    name: 'Plain Chicken',
    servings: 3, 
    cookTime: '1.45',
    instructions:   '1. Put salt on Chicken\n2. Put chicken in oven\n3. Eat chicken',
    ingredients: [
      {
        id: 1, 
        name: 'Chicken',
        amount: '2 Pounds'
      },
      {
        id: 2,
        name: 'Salt',
        amount: '1 tbs'
      }
    ]
  },
  {
    id: 2,
    name: 'Plain Pork',
    servings: 5, 
    cookTime: '1.45',
    instructions:   '1. Put salt on Pork\n2. Put pork in oven\n3. Eat pork',
    ingredients: [
      {
        id: 1, 
        name: 'Pork',
        amount: '3 Pounds'
      },
      {
        id: 2,
        name: 'Paprika',
        amount: '2 tbs'
      }
    ]
  }
]

export default App;
