import React, { useState } from 'react'
import { ReduxStore } from '../useReduxStore'


interface Recipe{
    id: number,
    name: string,
    ingredients: string[],
    instructions: string
}


const Recipes = () => {
    const {recipes, addRecipe, removeRecipes} = ReduxStore();
    const [name, setName] = useState<string>('');
    const [ingredients, setIngredients] = useState<string>('');
    const [instructions, setInstructions] = useState<string>('');
    const [editingRecipe, setEditingRecipe] = useState<number | null>(null);


    const handleEditRecipe = (recipe) => {

        setEditingRecipe(null);
        setName(recipe.name);
        setInstructions(recipe.instructions);
        setIngredients(recipe.ingredients.join(", "));

    }

    const handleUpdateRecipe = () => {

    if(name.trim() === "" || instructions.trim() === "" || ingredients.trim() === "") return;

     addRecipe({
      id: Date.now(),
      name,
      ingredients: ingredients
                   .split(",")
                   .map((ingredient) => ingredient.trim()),
      instructions
                   
     })

     setName("");
     setIngredients("")
     setInstructions("");
     
    }

    const handleAddRecipe = () => {
      
    if(name.trim() === '' || instructions.trim() === '' || ingredients.trim() === '') return;

    addRecipe({
      id: Date.now(),
      name,
      ingredients: ingredients
                  .split(",")
                  .map((ingredient) => ingredient.trim()),
      instructions
    })


    // empty out every field  
    setName("");
    setInstructions("");
    setIngredients("")
      
    }

    const handleCancelRecipe = () => {

      setEditingRecipe(null);
      setName("");
      setInstructions("");
      setIngredients("");

    }
 

  return (
    <div className='min-h-screen flex items-center justify-center bg-green-200'>
      <div className='bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl'>

        <h1 className='text-center text-3xl mb-5 font-bold text-green-600'>
            Recipe Store
        </h1>

      <input type="text" 
      value={name}
      onChange={e => setName(e.target.value)}
      placeholder='Enter Recipe...'
      className='space-y-4 mb-4 w-full px-2 py-3 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600' 
      />

      <input type='text'
      value={ingredients}
      onChange={e => setIngredients(e.target.value)}
      placeholder='Enter Ingredients with (comma separated)'
      className='w-full px-2 py-3 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600'
      />

      <textarea
      value={instructions}
      onChange={e => setInstructions(e.target.value)}
      className='w-full mt-5 px-2 py-3 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600'
    />


    <div className='flex justify-between'>
    {
      editingRecipe ? (
          <>
            <button onClick={handleUpdateRecipe} className='bg-yellow-500 text-white px-4 py-2 rounded-lg mt-4 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-600'>Update Recipe</button>
            <button onClick={handleCancelRecipe} className='bg-green-500 text-white px-4 py-2 rounded-lg mt-4 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-600'>Cancel Recipe</button>
          </>
      ) : 
      (
        <button onClick={handleAddRecipe} className='bg-green-500 text-white px-4 py-2 rounded-lg mt-4 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-600'>Add Recipe</button>
      )
    }


    </div>

    <ul className='space-y-4'>
      {recipes.map((recipe) => (
        <li
        key={recipe.id}
        className='p-4 bg-green-50 rounded-lg shadow-sm'
        >
        
        <h2 className='text-xl font-semibold text-green-800 mb-2'>
            {recipe.name}
        </h2>

        <p className='text-gray-700 mb-2'>
          <strong>Instructions:</strong>{recipe.ingredients.join(",")}
        </p>

        <p className='text-gray-700 mb-2'>
          <strong>Ingredients:</strong> {recipe.instructions}
        </p>

        <div className='flex justify-between'>
            <button onClick={() => handleEditRecipe(recipe)} className='px-2 py-3 bg-gray-300 rounded-xl hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400'>
          Edit
        </button>

        <button onClick={() => removeRecipes(recipe.id)} className='px-2 py-3 bg-yellow-300 rounded-xl hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400'>
            Delete
        </button>
        </div>

        </li>
      ))}

    </ul>
   
    </div>

    

        
    </div>
  )
}

export default Recipes