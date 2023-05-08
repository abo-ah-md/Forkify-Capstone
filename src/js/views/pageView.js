import View from "./view.js";
import icons from "../../img/icons.svg";

class PageView extends View{
    _parentELement=document.querySelector(".pagination");




    addPageClickHandler(hanlder){
      this._parentELement.addEventListener("click",function (e){
        e.preventDefault();

        const btn = e.target.closest(".btn--inline");
        if (!btn) return
        const gotoPage = +btn.dataset.goto
        
        hanlder(gotoPage);
      })
     
      }

    _generateMarkup(){
    const currentPage = this._data.page
    const numberOfPages= Math.ceil(this._data.result.length /this._data.resultPerPage);
        //page 1 and there are other pages 
        if (currentPage ===1 && numberOfPages > 1) {
          return `
          <button data-goto=${currentPage+1} class="btn--inline pagination__btn--next">
          <span>Page ${currentPage+1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>
          `
        }
        
        //Last Page
        if (currentPage === numberOfPages && numberOfPages >1) {
          return` 
          <button data-goto=${currentPage-1}  class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage-1}</span>
          </button>

          
          `
        }
        //other page
        if (currentPage < numberOfPages) {
          return `
          <button data-goto=${currentPage-1}  class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage-1}</span>
          </button>
          
          <button data-goto=${currentPage+1}  class="btn--inline pagination__btn--next">
          <span>Page ${currentPage+1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>
          
          `
        }
        
        //page 1 and there are  NO other pages 
        return``;
    }
}
export default new PageView();
