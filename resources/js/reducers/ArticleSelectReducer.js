


const initialState = {
    article: undefined,
  
}

function ArticleSelectReducer(state = initialState, action){
    let nextState

    switch (action.type) {
      

            case 'EDIT_ARTICLE_SELECTED':
                nextState = {
                     article :  {...action.value}

                } 
                return nextState || state      
      
        default:
         return state;
    }

}

export default ArticleSelectReducer
