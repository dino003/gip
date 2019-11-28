
const initialState = {
    items: {},
    loading: false,
    error: null
}

function ConsommationReducer(state = initialState, action){
    let nextState

    switch (action.type) {
      
        case 'ADD_INFO_SOCIETE':
          
            nextState = {
                ...state,
                items: {...action.value}
            }
            return nextState || state

            case 'GET_INFO_SOCIETE':
          
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

export default ConsommationReducer
