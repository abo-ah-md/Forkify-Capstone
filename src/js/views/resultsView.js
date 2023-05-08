import View from "./view.js";
import PreViewView from "./previewView.js"

import icons from "../../img/icons.svg";


class ResultsView extends View{
_parentELement=document.querySelector(".results");
_errorMessage =` No recipe was found by your search plaeae try again !`;
_Message="";


_generateMarkup(){
  return this._data.map(result =>PreViewView.render(result,false)).join("")
}



//preview__link--active

/*
<div class="preview__user-generated">
                      <svg>
                        <use href="${icons}#icon-user"></use>
                      </svg>
                    </div>
 </div>                    
                    */


           _generateMarkupPreview(data){
            const id =window.location.hash.slice(1);
            return  `
            <li class="preview">
                <a class="preview__link ${id === data.id ? "preview__link--active":"" } " href="#${data.id}">
                  <figure class="preview__fig">
                    <img src=${data.image} alt="Test" />
                  </figure>
                  <div class="preview__data">
                  <h4 class="preview__title">${data.title}...</h4>
                  <p class="preview__publisher">${data.publisher}</p>
                   </div>
                </a>
              </li>
            `
           }
           
}

export default new ResultsView();