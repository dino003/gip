
const initialState = {
    items: undefined,
    loading: false,
    error: null
}

function ModulesReducer(state = initialState, action){
    let nextState

    switch (action.type) {
      
        case 'ADD_PARAM_MODULE':
          
            nextState = {
                ...state,
                items: {...action.value}
            }
            return nextState || state

            case 'GET_PARAM_MODULE':
          
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

export default ModulesReducer
