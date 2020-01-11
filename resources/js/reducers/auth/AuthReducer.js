

const initialState = {
    user: undefined,
  
}

function AuthReducer(state = initialState, action){
    let nextState

    switch (action.type) {
        case 'GET_AUTH':
          
            nextState = {
                ...state,
                user: {...action.value}
            }
            return nextState || state      
      
        default:
         return state;
    }

}

export default AuthReducer




