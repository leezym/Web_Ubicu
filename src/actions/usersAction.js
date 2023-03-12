import { CREAR_USER, ELIMINAR_USER, ACTUALIZAR_USER, MOSTRAR_USERS, AUTHENTICATE_USER, CHECKTOKEN_USER, GET_USER } from "./types.js";
import axios from "axios";

// json local json server
//const urlLocal = "http://localhost:5000/";
const urlLocal = "https://server.ubicu.co/";

const urlApi = urlLocal;

const optionHeaders = {
    headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token')
    }
};

export const mostrarUsers = () => async dispatch => {
    const respuesta = await axios.get(urlApi + "allUsers", optionHeaders);
    console.log(respuesta);
    dispatch({
        type: MOSTRAR_USERS,
        payload: respuesta.data
    });
};

export const crearUser = (user) => async dispatch => {
    const respuesta = await axios.post(urlApi + "createUser", user);
    console.log(respuesta);
    dispatch({
        type: CREAR_USER,
        payload: respuesta.data
    });
};

export const deleteUser = (cedula) => async dispatch => {
    console.log(cedula);
    const respuesta = await axios.post(urlApi + "deleteUser", cedula, optionHeaders);
    console.log(respuesta.data);
    dispatch({
        type: ELIMINAR_USER,
        payload: cedula
    });
};

export const updateUser = (product) => async dispatch => {
    console.log(product);
    let datos;
    const respuesta = await axios.put(urlApi + product.id, product, optionHeaders).then(
        datos = await axios.get(urlApi)
    );
    console.log(datos);
    dispatch({
        type: ACTUALIZAR_USER,
        payload: datos.data
    });
};

export const authenticateUser = (data) => async dispatch => {
    console.log(data);
    console.log("data");
    const respuesta = await axios.post(urlApi + "authenticateUser", data);
    //        sessionStorage.setItem(‘jwtToken’, response.payload.data.token);
    console.log(respuesta);

    dispatch({
        type: AUTHENTICATE_USER,
        payload: respuesta.data
    });
};

export const checkToken = () => async dispatch => {
    const respuesta = await axios.get(urlApi + "checkToken");
    console.log(respuesta);
    dispatch({
        type: CHECKTOKEN_USER,
        payload: respuesta.data
    });
};

export const getUserbyId = (id_user) => async dispatch => {
    const respuesta = await axios.post(urlApi + "getUserbyId", id_user);
    console.log(respuesta);
    dispatch({
        type: GET_USER,
        payload: respuesta.data
    });
};