import { MOSTRAR_RESULTS } from "./types.js";
import axios from "axios";
import { optionHeaders } from './headers.js';

// json local json server
//const urlLocal = "http://localhost:5000/";
const urlLocal = "https://server.ubicu.co/";



const urlApi = urlLocal;

export const allResultsByEjercicio = (data) => async dispatch => {
    const respuesta = await axios.post(urlApi + "allResultsByEjercicio", data, optionHeaders);
    dispatch({
        type: MOSTRAR_RESULTS,
        payload: respuesta.data
    });
    return respuesta.data;
};