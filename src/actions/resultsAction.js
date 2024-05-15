import { MOSTRAR_RESULTS } from "./types.js";
import axios from "axios";
import { optionHeaders } from './headers.js';
import { URL } from './url.js';

export const allResultsByEjercicio = (data) => async dispatch => {
    const respuesta = await axios.post(URL + "allResultsByEjercicio", data, optionHeaders);
    dispatch({
        type: MOSTRAR_RESULTS,
        payload: respuesta.data
    });
    return respuesta.data;
};