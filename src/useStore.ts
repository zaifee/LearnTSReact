import {create} from 'zustand';

interface Recipe{
    id: number,
    name: string,
    ingredients: string[],
    instructions: string;
}   

interface RecipeStore{
    recipes: Recipe[];
    addRecipe: (recipe: Recipe) => void;
    removeRecipes: (id: number) => void;

}



export const useStore = create<RecipeStore>((set) => ({
    recipes: [],

   addRecipe: (recipe) => set((state) => ({ recipes : [...state.recipes, recipe]})),
   removeRecipes: (id) => set((state) => ({recipes: state.recipes.filter((recipe) => recipe.id !== id)

    }))

}))