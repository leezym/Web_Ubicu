import {MOSTRAR_RESULTS} from "../actions/types.js";

const estadoinicial={
    results:[]
}
export default function(state=estadoinicial,action){
    switch (action.type) {
        case MOSTRAR_RESULTS:
            return {...state,results:action.payload};
            break;
        default:
            return state;
            break;
    }
}