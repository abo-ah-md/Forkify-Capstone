import View from "./view.js";
import icons from "../../img/icons.svg";

class AddRecipeView extends View{
    _parentELement=document.querySelector(".upload")
    _windowEl=document.querySelector(".add-recipe-window");
    _overlayEl=document.querySelector(".overlay");
    _btnOpen=document.querySelector(".nav__btn--add-recipe");
    _btnClose=document.querySelector(".btn--close-modal");
    _Message= `recipe has been added 🎉🎉`

    

    _toggleWindowClass(){
        this._overlayEl.classList.toggle("hidden")
        this._windowEl.classList.toggle("hidden")

    }
    
    
    _addHandlerShowWindow(){
        this._btnOpen.addEventListener("click",this._toggleWindowClass.bind(this))
    }


    _addHandlerCloseWindow(){
        this._btnClose.addEventListener("click",this._toggleWindowClass.bind(this));
        this._overlayEl.addEventListener("click",this._toggleWindowClass.bind(this))
    } 
        

    addHandlerUpload(handler){
        this._parentELement.addEventListener("submit",function (e) { 
            e.preventDefault();
            const dataArr = [...new FormData(this)]
            const data= Object.fromEntries(dataArr)
            handler(data);
         })
    }
    
    constructor(){
        super();
        this._addHandlerShowWindow();
        this._addHandlerCloseWindow();
     
    }
    




    _generateMarkup(){
    return `
          ` }
        
        //page 1 and there are  NO other pages 
       
    }

export default new AddRecipeView();
