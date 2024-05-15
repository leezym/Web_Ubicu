import { CREAR_EJERCICIO, ACTUALIZAR_EJERCICIO } from "./types.js";
import axios from "axios";
import { optionHeaders } from './headers.js';
import { URL } from './url.js';

export const crearEjercicio = (ejercicio) => async dispatch => {
    const respuesta = await axios.post(URL + "createEjercicio", ejercicio, optionHeaders);
    dispatch({
        type: CREAR_EJERCICIO,
        payload: respuesta.data
    });
};

export const updateEjercicio = (ejercicio) => async dispatch => {
    const respuesta = await axios.put(URL + "updateEjercicio", ejercicio, optionHeaders);
    dispatch({
        type: ACTUALIZAR_EJERCICIO,
        payload: ejercicio
    });
};