
const initialState = {
    items: undefined,
    loading: false,
    error: null
}

function ParamStockReducer(state = initialState, action){
    let nextState

    switch (action.type) {
      
        case 'ADD_PARAM_STOCK':
          
            nextState = {
                ...state,
                items: {...action.value}
            }
            return nextState || state

            case 'GET_PARAM_STOCK':
          
                    nextState = {
                        ...state,
                        items: action.value,
                        loading: false
                    }
                    return nextState || state
     
      
        default:
         return state;
    }

}

export default ParamStockReducer
