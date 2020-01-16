


const initialState = {
    items: [],
    loading: false,
    error: null
}

function TiersReducer(state = initialState, action){
    let nextState

    switch (action.type) {
        case 'START_UPLOAD_TIER':
            nextState = {
                ...state,
                loading: true
            }
     return nextState || state

     case 'STOP_UPLOAD_TIER':
        nextState = {
            ...state,
            loading: false
        }
    return nextState || state

        case 'ADD_TIER':
          
            nextState = {
                ...state,
                items: [action.value, ...state.items]
            }
            return nextState || state

            case 'GET_TIER':
          
                    nextState = {
                        ...state,
                        items: action.value,
                        loading: false
                    }
                    return nextState || state

            case 'REMOVE_TIER': 
            const itemIndex = state.items.findIndex(item => item.id === action.value)

                    nextState = {
                        ...state,
                        items: state.items.filter((item, index) => index !== itemIndex)
                    }
                    return nextState || state

            case 'EDIT_TIER':
                    nextState = {
                        ...state,
                        items: state.items.map(item => {
                            if (item.id === action.value.id) { // value ici est id de l'item
                            let iEdit = action.value;
                             // item = itemEdit
                             item =  {...iEdit}

                            }
                            return item;
                          })
                    } 
                    return nextState || state
        
      
        default:
         return state;
    }

}

export default TiersReducer
