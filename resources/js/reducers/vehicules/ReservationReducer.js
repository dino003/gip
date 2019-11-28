
const initialState = {
    items: [],
    loading: false,
    error: null
}

function ReservationReducer(state = initialState, action){
    let nextState

    switch (action.type) {
      
        case 'ADD_RESERVATION':
          
            nextState = {
                ...state,
                items: [action.value, ...state.items]
            }
            return nextState || state

            case 'GET_RESERVATION':
          
                    nextState = {
                        ...state,
                        items: action.value,
                        loading: false
                    }
                    return nextState || state

            case 'REMOVE_RESERVATION': 
            const itemIndex = state.items.findIndex(item => item.id === action.value)

                    nextState = {
                        ...state,
                        items: state.items.filter((item, index) => index !== itemIndex)
                    }
                    return nextState || state

            case 'EDIT_RESERVATION':
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
                
                case 'TRANSFORMATION_RESERVATION_UTILISATION':
                    nextState = {
                        ...state,
                        items: state.items.map(item => {
                            if (item.id === action.value.id) { 
                           // item.transforme_en_utilisation = !item.transforme_en_utilisation
                            let iEdit = action.value;
                            // item = itemEdit
                            item =  {...iEdit}
   
                            }
                            return item;
                          })
                    } 
                    return nextState || state 

                    case 'ENREGISTRER_DEPART_RESERVATION_UTILISATION':
                        nextState = {
                            ...state,
                            items: state.items.map(item => {
                                if (item.id === action.value.id) { 
                               // item.transforme_en_utilisation = !item.transforme_en_utilisation
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

export default ReservationReducer
