import { async } from "regenerator-runtime";
import {ajax} from "./helper.js"
import {API_URL,RES_PER_PAGE,API_KEY} from "./config.js"

export const state = {
    recipe:{
      
    },
    search:{
      query:"",
      result:[],
      resultPerPage:RES_PER_PAGE,
      page:1,
    },
    bookmark:[]
};




const createResipeObject = function(data){
  const {recipe} = data.data; 
  
  
 return state.recipe = {
   bookmarked:false,
   id:recipe.id,
   image:recipe.image_url,
   ingredients:recipe.ingredients,
   cookingTime:recipe.cooking_time,
   servings:recipe.servings,
   publisher:recipe.publisher,
   sourceUrl:recipe.source_url,
   title:recipe.title,
   ...(recipe.key&& {key:recipe.key})
 };
}


export const loadRecipe = async function (id) { 
    try{

const data = await ajax(`${API_URL}${id}?key=${API_KEY}`)
createResipeObject(data);

  if (state.bookmark.some(bookmark => bookmark.id === id)) {
      state.recipe.bookmarked = true
    }

    }catch(e){throw e}
 };


export const loadSearchResult =async function(query){
try{

  const data = await ajax(`${API_URL}?search=${query}&key=${API_KEY}`);

  state.search.query=query
  state.search.result = data.data.recipes.map(rec =>{
  
  return {
    id:rec.id,
    image:rec.image_url,
    publisher:rec.publisher,
    title:rec.title,
    ...(rec.key&& {key:rec.key})

  };
  

})
state.search.page=1
}catch(e)
{throw e}
}

export const getSearchResultsPage = function(page = state.search.page){
state.search.page = page;

const start =(page-1)*state.search.resultPerPage;
const end =page * state.search.resultPerPage;

  return state.search.result.slice(start,end);
}


export const updateServing = function (newServings) {
state.recipe.ingredients.forEach(ing => {
  ing.quantity = ing.quantity * newServings/ state.recipe.servings;
  
});
state.recipe.servings = newServings
  };





const prisistBookmarkData = function (){

  localStorage.setItem("bookmark",JSON.stringify(state.bookmark))
}









export const addBookmark = function (recipe){
state.bookmark.push(recipe);

if (recipe.id=== state.recipe.id) state.recipe.bookmarked = true;

prisistBookmarkData();

}


export const deleteBookmark = function(id){
const index = state.bookmark.findIndex(bookmark => bookmark.id === id);
state.bookmark.splice(index,1);


if (id ===state.recipe.id ) state.recipe.bookmarked = false;

prisistBookmarkData();

};



export const uploadRecipe = async function(data){
try{

  const ingridients = await Object.entries(data)
  .filter(entry => entry[0].startsWith(`ingredient`)&& entry[1]!=='')
  
  .map(ing =>
    {
      const ingArr = ing[1].replaceAll(" ","").split(",");
      
      if (ingArr.length !== 3 ) throw new Error("wrong ingredient format");
      
      const [quantity,unit,discribtion]= ingArr;
      
      return {quantity:quantity? +quantity : null,unit,discribtion};
    })
    
    
    const recipe= {
      cooking_time:data.cookingTime,
      image_url:data.image,
      servings: data.servings,
      publisher:data.publisher,
      source_url:data.sourceUrl,
      title:data.title,
      
    }

    
   const retrivedData = await ajax(`${API_URL}?key=${API_KEY}`,recipe);
  state.recipe = createResipeObject(retrivedData);
  addBookmark(state.recipe);
}catch(e){throw e}
};

const init = function (param) {
  const storage =localStorage.getItem("bookmark");

  if (!storage) return;

  state.bookmark = JSON.parse(storage);

  }

  init();


//for debugging 
const clearBookmark= function (){
localStorage.clear("bookmark");
}