
const initialState = {
    items: undefined,
    loading: false,
    error: null
}

function ParamVehiculeInfoReducer(state = initialState, action){
    let nextState

    switch (action.type) {

        case 'ADD_PARAM_VEHICULE':

            nextState = {
                ...state,
                items: {...action.value}
            }
            return nextState || state

            case 'GET_PARAM_VEHICULE':

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

export default ParamVehiculeInfoReducer
