

const initialState = {
    items: [],
    loading: false,
    error: null
}

function StructureGeographiqueReducer(state = initialState, action){
    let nextState

    switch (action.type) {
        case 'ADD_STRUCTURE_GEOGRAPHIQUE':
          
            nextState = {
                ...state,
                items: [...state.items, action.value]
            }
            return nextState || state

            case 'GET_STRUCTURE_GEOGRAPHIQUE':
          
                    nextState = {
                        ...state,
                        items: action.value,
                        loading: false
                    }
                    return nextState || state

            case 'REMOVE_STRUCTURE_GEOGRAPHIQUE': 
            const itemIndex = state.items.findIndex(item => item.id === action.value)

                    nextState = {
                        ...state,
                        items: state.items.filter((item, index) => index !== itemIndex)
                    }
                    return nextState || state

            case 'EDIT_STRUCTURE_GEOGRAPHIQUE':
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
        
      
        default:
         return state;
    }


}

export default StructureGeographiqueReducer
