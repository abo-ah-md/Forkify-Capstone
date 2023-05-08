import View from "./view.js";
import icons from "../../img/icons.svg";


class PreviewView extends View{
_parentELement="";


    
    _generateMarkup(){
       
            const id =window.location.hash.slice(1);
            return  `
            <li class="preview">
            <a class="preview__link" href="#${this._data.id}">
              <figure class="preview__fig">
                <img src="${this._data.image}" alt="Test" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__name">
                  ${this._data.title}
                </h4>
                <div class="recipe__user-generated ${!this._data.key? "hidden":" "}">
            <svg>
              <use href="${icons}#icon-user"></use>
            </svg>
          </div>
                <p class="preview__publisher">${this._data.publisher}</p>
              </div>
            </a>
          </li>
            `
           }
           
}

export default new PreviewView();






/*

<li class="preview">
                    <a class="preview__link" href="#${data.id}">
                      <figure class="preview__fig">
                        <img src="${data.image}" alt="Test" />
                      </figure>
                      <div class="preview__data">
                        <h4 class="preview__name">
                          ${data.title}
                        </h4>
                        <p class="preview__publisher">${data.publisher}</p>
                      </div>
                    </a>
                  </li>
                  */

