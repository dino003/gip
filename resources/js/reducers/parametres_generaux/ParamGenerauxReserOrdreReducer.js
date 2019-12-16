
const initialState = {
    items: undefined,
    loading: false,
    error: null
}

function ParamGenerauxReserOrdreReducer(state = initialState, action){
    let nextState

    switch (action.type) {
      
        case 'ADD_PARAM_GENERAUX_RESERV':
          
            nextState = {
                ...state,
                items: {...action.value}
            }
            return nextState || state

            case 'GET_PARAM_GENERAUX_RESERV':
          
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

export default ParamGenerauxReserOrdreReducer
