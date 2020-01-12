

const initialState = {
    abonnement: undefined,
  
}

function AbonnementReducer(state = initialState, action){
    let nextState

    switch (action.type) {
        case 'GET_ABONNEMENT':
          
            nextState = {
                ...state,
                abonnement: {...action.value}
            }
            return nextState || state      
      
        default:
         return state;
    }

}

export default AbonnementReducer




