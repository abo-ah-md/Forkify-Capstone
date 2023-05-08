import View from "./view.js";
import PreViewView from "./previewView.js"
import icons from "../../img/icons.svg";


class BookmarksView extends View{
_parentELement=document.querySelector(".bookmarks__list");
_errorMessage =` No bookmarks yet. Find a nice recipe and bookmark it :)`;
_Message="";


    _generateMarkup(){
        return this._data.map(bookmark =>PreViewView.render(bookmark,false)).join("")
    }

    addHandlerBookmark(handler){
        window.addEventListener("load",(handler))
    }

}

export default new BookmarksView();


