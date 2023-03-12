import {MOSTRAR_EJERCICIOS,CREAR_EJERCICIO,ELIMINAR_EJERCICIO,ACTUALIZAR_EJERCICIO} from "../actions/types.js";

const estadoinicial={
    ejercicios:[]
}
export default function(state=estadoinicial,action){
    switch (action.type) {
        case MOSTRAR_EJERCICIOS:
            return {...state,ejercicios:action.payload};
            break;
        case CREAR_EJERCICIO:
            return {...state,ejercicios:[...state.ejercicios,action.payload]};
            break;
        case ELIMINAR_EJERCICIO:
            return {...state,ejercicios:state.ejercicios.filter(p => p.cedula !== action.payload)};
            break;
        case ACTUALIZAR_EJERCICIO:
            return {...state,ejercicios:action.payload};
            break;
        default:
            return state;
            break;
    }
}