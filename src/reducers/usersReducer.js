import { MOSTRAR_USERS, CREAR_USER, ELIMINAR_USER, ACTUALIZAR_USER, AUTHENTICATE_USER, CHECKTOKEN_USER, GET_USER } from "../actions/types.js";

const estadoinicial = {
    users: []
}
export default function(state = estadoinicial, action) {
    switch (action.type) {
        case MOSTRAR_USERS:
            return {...state, users: action.payload };
            break;
        case CREAR_USER:
            return {...state, users: [...state.users, action.payload] };
            break;
        case ELIMINAR_USER:
            return {...state, users: state.users.filter(p => p.cedula !== action.payload) };
            break;
        case ACTUALIZAR_USER:
            return {...state, users: action.payload };
            break;
        case AUTHENTICATE_USER:
            return {...state, users: action.payload };
            break;
        case CHECKTOKEN_USER:
            console.log(action.payload);
            return {...state, users: action.payload };
            break;
        case GET_USER:
            return {...state, users: action.payload };
            break;
        default:
            return state;
            break;
    }
}