import { CREAR_USER, ACTUALIZAR_USER, AUTHENTICATE_USER, CHECKTOKEN_USER } from "./types.js";
import axios from "axios";
import { optionHeaders } from './headers.js';
import { URL } from './url.js';

export const crearUser = (user) => async dispatch => {
    const respuesta = await axios.post(URL + "createUser", user);
    dispatch({
        type: CREAR_USER,
        payload: respuesta.data
    });
};

export const updateUser = (user) => async dispatch => {
    const respuesta = await axios.put(URL + "updateUser", user, optionHeaders);
    dispatch({
        type: ACTUALIZAR_USER,
        payload: user
    });
};

export const updatePassword = (user) => async dispatch => {
    const respuesta = await axios.put(URL + "updatePassword", user, optionHeaders);
    dispatch({
        type: ACTUALIZAR_USER,
        payload: user
    });
    return respuesta.data;
};

export const authenticateUser = (data) => async dispatch => {
    const respuesta = await axios.post(URL + "authenticateUser", data);
    dispatch({
        type: AUTHENTICATE_USER,
        payload: respuesta.data
    });
};

export const checkToken = () => async dispatch => {
    const respuesta = await axios.get(URL + "checkToken");
    dispatch({
        type: CHECKTOKEN_USER,
        payload: respuesta.data
    });
};