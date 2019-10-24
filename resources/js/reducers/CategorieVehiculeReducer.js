


const initialState = {
    items: [],
    loading: false,
    error: null
}

function CategorieVehiculeReducer(state = initialState, action){
    let nextState

    switch (action.type) {
        case 'ADD_CATEGORIE_VEHICULE':
          
            nextState = {
                ...state,
                items: [action.value, ...state.items]
            }
            return nextState || state

            case 'GET_CATEGORIE_VEHICULE':
          
                    nextState = {
                        ...state,
                        items: action.value,
                        loading: false
                    }
                    return nextState || state

            case 'REMOVE_CATEGORIE_VEHICULE': 
            const itemIndex = state.items.findIndex(item => item.id === action.value)

                    nextState = {
                        ...state,
                        items: state.items.filter((item, index) => index !== itemIndex)
                    }
                    return nextState || state

            case 'EDIT_CATEGORIE_VEHICULE':
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

export default CategorieVehiculeReducer
