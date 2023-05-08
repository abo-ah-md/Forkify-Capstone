import icons from "../../img/icons.svg";



export default class View{
//variables declartion
//////////////////////////////////
_data;

//the main render data
render(data,render=true){

if (!data|| Array.isArray(data)&& data.length ===0) this.renderError();

this._data =data;
const markup = this._generateMarkup();

if (!render) return markup;

this._clearcontainer();   
this._parentELement.insertAdjacentHTML("afterbegin",markup);

}
//////////////////////////////////
    
    
    
    
//////////////////////////////////
    //to laod a spinnig 
    Renderspinner (){
    
    const markup =`
        <div class="spinner">
                  <svg>
                    <use href="${icons}#icon-loader"></use>
                  </svg>
        </div>
                `;
                
    
    this._clearcontainer();
    
    this._parentELement.insertAdjacentHTML("afterbegin",markup)
};
    //////////////////////////////////
    update(data,render=true){

  this._data = data;
      //this is the newmarkup to copmare with the old one
      const newmarkup = this._generateMarkup();



    if (!render) return newmarkup;

    const newDOM = document.createRange().createContextualFragment(newmarkup);
    const newElements = Array.from(newDOM.querySelectorAll("*"));
    const currentElements = Array.from(this._parentELement.querySelectorAll("*"));
    
newElements.forEach(
  (newEL,i) =>{ 
    const curEL = currentElements[i];
   
  //Update change Text 
  if (!newEL.isEqualNode(curEL)&&newEL?.firstChild?.nodeValue.trim() !== "") {
    curEL.textContent = newEL.textContent
  }

  //Update change atteribute 
if (!newEL.isEqualNode(curEL)) {
  Array.from(newEL.attributes).forEach(attr =>{
    curEL.setAttribute(attr.name,attr.value)
    
  })

}



})
    }
    
    
    
    //////////////////////////////////
    //to empty the html container    
    _clearcontainer(){ this._parentELement.innerHTML='';}
    
    
    
    
    /////////////////////////////////////Handlers//////////////////////////////////////////////

    addHandlerRender(handler){
    
      ["hashchange","load"]
      .forEach(ev => window.addEventListener(ev,handler));
    }
    
    
    renderError(message= this._errorMessage){
      const markup = `
      <div class="error">
      <div>
        <svg>
          <use href="${icons}#icon-alert-triangle"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>
    `
    
    this._clearcontainer();
    
    this._parentELement.insertAdjacentHTML("afterbegin",markup)
    }
    
    //////////////////////////////////
    
    
    
    //////////////////////////////////
    
    renderMessage(message= this._Message){
      const markup = `
      <div class="message">
      <div>
        <svg>
          <use href="${icons}#icon-smile"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>
    `
    
    this._clearcontainer();
    
    this._parentELement.insertAdjacentHTML("afterbegin",markup)
    
    };


    ///////////////////////////////
}