import { async } from "regenerator-runtime";
import "core-js/stable";
import "regenerator-runtime/runtime";
import * as model from "./model.js";
import recipeView from "./views/recipeViw.js";
import searchView from "./views/searchVew.js"
import resultsView from "./views/resultsView.js"
import bookmarkView from "./views/bookmarkView.js"
import AddRecipeView from "./views/addRecipeView.js"

import pageView from "./views/pageView.js"

//for hot reloading using parcel
if (module.hot) module.hot.accept; 
////////////////////////////////////////////////////////////
////////////////////////////////////////////////

const controlRecipe = async function(){
try{

//rendering the spinner animation till data are displayed
  recipeView.Renderspinner();

  //getting the url hash 
const id = window.location.hash.slice(1);
if (!id) return;


//0)update result View
resultsView.update(model.getSearchResultsPage());


//1)getting recipe 
await model.loadRecipe(id);



const {recipe} =model.state;
//2)rendering recipe
recipeView.render(recipe);




//)update bookmark View 
bookmarkView.update(model.state.bookmark)

}catch(e){
  recipeView.renderError()
  console.log(e);
  }
};
////////////////////////////////
const controlSearchResult = async function(){
try{
//rendering the spinner animation till data are displayed
resultsView.Renderspinner();

//for Getting the qury to render
  const query =searchView.getQuery();
if (!query) return;


//for Getting the qury to render
  await model.loadSearchResult(query);

  //rendering result
resultsView.render(
  model.getSearchResultsPage(1) //rendering resultPage
  );
  //rendering page
  pageView.render(model.state.search);
  


}catch(e){
  resultsView.renderError(e)
  console.log(e)}

}

const controlPagination =function (page){
//rendering new result
resultsView.render(
  model.getSearchResultsPage(page) //rendering resultPage
  );
  //rendering new page
  pageView.render(model.state.search);
  
}


const controlServing = function (newServings) {
//update the ricpe servings (in state)
model.updateServing(newServings);
recipeView.update(model.state.recipe);


}




  const controlAddBookmark= function(){

    //Add//remove Bookmark
    if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
    else model.deleteBookmark(model.state.recipe.id);

    //update recipe view
    recipeView.update(model.state.recipe);
   
  //renderBookmark
  bookmarkView.render(model.state.bookmark);
  }


const controlBookmarks=function(){
  bookmarkView.render(model.state.bookmark)
}



const controlAddRecipe = async function(newRecipeData){
try{

  AddRecipeView.Renderspinner();
  await model.uploadRecipe(newRecipeData);

  recipeView.render(model.state.recipe);
 

  AddRecipeView.renderMessage();



  bookmarkView.render(model.state.bookmark);


  //change id in URL 
  window.history.pushState(null,"",`#${model.state.recipe.id}`)

  setTimeout(function(){AddRecipeView._toggleWindowClass()},2.5*1000);
  
}catch(e){
  AddRecipeView.renderError(e.message)
  console.error(e);
}

}

//////////////////////////////////////////
const init = function(){
  bookmarkView.addHandlerBookmark(controlBookmarks)
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServing);
  recipeView.addHandlerBookmark(controlAddBookmark);
  searchView.addSeachHandler(controlSearchResult);
  pageView.addPageClickHandler(controlPagination);
  AddRecipeView.addHandlerUpload(controlAddRecipe)

}

init();
