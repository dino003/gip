
const initialState = {
    items: {},
    loading: false,
    error: null
}

function ThemeReducer(state = initialState, action){
    let nextState

    switch (action.type) {
      
        case 'ADD_THEME':
          
            nextState = {
                ...state,
                items: {...action.value}
            }
            return nextState || state

            case 'ADD_THEME_NAVBAR':
          
                nextState = {
                    ...state,
                    items: {...state.items, navbar: action.value}
                }
                return nextState || state

                case 'ADD_THEME_SIDEBAR':
          
                    nextState = {
                        ...state,
                        items: {...state.items, sidebar: action.value}
                    }
                    return nextState || state

            case 'GET_THEME':
          
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

export default ThemeReducer
