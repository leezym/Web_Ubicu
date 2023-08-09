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