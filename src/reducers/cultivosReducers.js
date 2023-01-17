import {MOSTRAR_CULTIVOS,CREAR_CULTIVO,ELIMINAR_CULTIVO,ACTUALIZAR_CULTIVO} from "../actions/types.js";

const estadoinicial={
    cultivos:[]
}
export default function(state=estadoinicial,action){
    switch (action.type) {
        case MOSTRAR_CULTIVOS:
            return {...state,cultivos:action.payload};
            break;
        case CREAR_CULTIVO:
            return {...state,users:[...state.users,action.payload]};
            break;
        case ELIMINAR_CULTIVO:
            console.log("Entro eliminar")
            return {...state,users:state.users.filter(p => p.cedula !== action.payload)};
            break;
        case ACTUALIZAR_CULTIVO:
            return {...state,productos:action.payload};
            break;
        default:
            return state;
            break;
    }
}