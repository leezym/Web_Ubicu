import { CREAR_EJERCICIO, ACTUALIZAR_EJERCICIO } from "./types.js";
import axios from "axios";
import { optionHeaders } from './headers.js';

// json local json server
//const urlLocal = "http://localhost:5000/";
const urlLocal = "https://server.ubicu.co/";

const urlApi = urlLocal;

export const crearEjercicio = (ejercicio) => async dispatch => {
    const respuesta = await axios.post(urlApi + "createEjercicio", ejercicio, optionHeaders);
    dispatch({
        type: CREAR_EJERCICIO,
        payload: respuesta.data
    });
};

export const updateEjercicio = (ejercicio) => async dispatch => {
    const respuesta = await axios.put(urlApi + "updateEjercicio", ejercicio, optionHeaders);
    dispatch({
        type: ACTUALIZAR_EJERCICIO,
        payload: ejercicio
    });
};