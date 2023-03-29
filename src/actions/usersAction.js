import { CREAR_USER, ELIMINAR_USER, ACTUALIZAR_USER, MOSTRAR_USERS, AUTHENTICATE_USER, CHECKTOKEN_USER, GET_USER } from "./types.js";
import axios from "axios";
import { optionHeaders } from './headers.js';

// json local json server
//const urlLocal = "http://localhost:5000/";
const urlLocal = "https://server.ubicu.co/";

const urlApi = urlLocal;

export const mostrarUsers = () => async dispatch => {
    const respuesta = await axios.get(urlApi + "allUsers", optionHeaders);
    dispatch({
        type: MOSTRAR_USERS,
        payload: respuesta.data
    });
};

export const crearUser = (user) => async dispatch => {
    const respuesta = await axios.post(urlApi + "createUser", user);
    dispatch({
        type: CREAR_USER,
        payload: respuesta.data
    });
};

export const deleteUser = (cedula) => async dispatch => {
    const respuesta = await axios.post(urlApi + "deleteUser", cedula, optionHeaders);
    dispatch({
        type: ELIMINAR_USER,
        payload: cedula
    });
};

export const updateUser = (product) => async dispatch => {
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
    const respuesta = await axios.post(urlApi + "authenticateUser", data);
    dispatch({
        type: AUTHENTICATE_USER,
        payload: respuesta.data
    });
};

export const checkToken = () => async dispatch => {
    const respuesta = await axios.get(urlApi + "checkToken");
    dispatch({
        type: CHECKTOKEN_USER,
        payload: respuesta.data
    });
};

export const getUserbyId = (id_user) => async dispatch => {
    const respuesta = await axios.post(urlApi + "getUserbyId", id_user);
    dispatch({
        type: GET_USER,
        payload: respuesta.data
    });
};