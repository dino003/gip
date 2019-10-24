

const initialState = {
    items: [],
    loading: false,
    error: null
}

function StructureEtablissementReducer(state = initialState, action){
    let nextState

    switch (action.type) {
        case 'ADD_STRUCTURE_ETABLISSEMENT':
          
            nextState = {
                ...state,
                items: [action.value, ...state.items]
            }
            return nextState || state

            case 'GET_STRUCTURE_ETABLISSEMENT':
          
                    nextState = {
                        ...state,
                        items: action.value,
                        loading: false
                    }
                    return nextState || state

            case 'REMOVE_STRUCTURE_ETABLISSEMENT': 
            const itemIndex = state.items.findIndex(item => item.id === action.value)

                    nextState = {
                        ...state,
                        items: state.items.filter((item, index) => index !== itemIndex)
                    }
                    return nextState || state

            case 'EDIT_STRUCTURE_ETABLISSEMENT':
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

export default StructureEtablissementReducer
