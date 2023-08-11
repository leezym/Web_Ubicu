import { CREAR_USER, ACTUALIZAR_USER, AUTHENTICATE_USER, CHECKTOKEN_USER } from "./types.js";
import axios from "axios";
import { optionHeaders } from './headers.js';

// json local json server
//const urlLocal = "http://localhost:5000/";
const urlLocal = "https://server.ubicu.co/";

const urlApi = urlLocal;

export const crearUser = (user) => async dispatch => {
    const respuesta = await axios.post(urlApi + "createUser", user);
    dispatch({
        type: CREAR_USER,
        payload: respuesta.data
    });
};

export const updateUser = (user) => async dispatch => {
    const respuesta = await axios.put(urlApi + "updateUser", user, optionHeaders);
    dispatch({
        type: ACTUALIZAR_USER,
        payload: user
    });
};

export const updatePassword = (user) => async dispatch => {
    const respuesta = await axios.put(urlApi + "updatePassword", user, optionHeaders);
    dispatch({
        type: ACTUALIZAR_USER,
        payload: user
    });
    return respuesta.data;
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