
const initialState = {
    items: undefined,
    loading: false,
    error: null
}

function VehiculeReducer(state = initialState, action){
    let nextState

    switch (action.type) {
        case 'START_VEHICULE':
            nextState = {
                ...state,
                items: [],
                loading: true
            }
     return nextState || state

        case 'ADD_VEHICULE':
          
            nextState = {
                ...state,
                items: [action.value, ...state.items]
            }
            return nextState || state

            case 'GET_VEHICULE':
          
                    nextState = {
                        ...state,
                        items: action.value,
                        loading: false
                    }
                    return nextState || state

            case 'REMOVE_VEHICULE': 
            const itemIndex = state.items.findIndex(item => item.id === action.value)

                    nextState = {
                        ...state,
                        items: state.items.filter((item, index) => index !== itemIndex)
                    }
                    return nextState || state

            case 'EDIT_VEHICULE':
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
                
                case 'EDIT_VEHICULE_KILOMETRAGE':
                    nextState = {
                        ...state,
                        items: state.items.map(item => {
                            if (item.id === action.value.id) { // value ici est id de l'item
                            let iEdit = action.value;
                             // item = itemEdit
                             item.kilometrage_acquisition =  iEdit.kilometrage_acquisition
    
                            }
                            return item;
                          })
                    } 
                    return nextState || state 
      
        default:
         return state;
    }

}

export default VehiculeReducer
