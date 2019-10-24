


const initialState = {
    vehicule: undefined,
  
}

function VehiculeSelectReducer(state = initialState, action){
    let nextState

    switch (action.type) {
      

            case 'EDIT_SELECTED':
                let iEdit = action.value;

                nextState = {
                   
                     vehicule :  {...action.value}

                } 
                return nextState || state      
      
        default:
         return state;
    }

}

export default VehiculeSelectReducer
