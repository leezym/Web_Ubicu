import { CREAR_USER, ACTUALIZAR_USER } from "./types.js";
import axios from "axios";
import { optionHeaders } from './headers.js';

// json local json server
//const urlLocal = "http://localhost:5000/";
const urlLocal = "https://server.ubicu.co/";

const urlApi = urlLocal;

export const crearPatient = (user) => async dispatch => {
    const respuesta = await axios.post(urlApi + "createPatient", user, optionHeaders);
    dispatch({
        type: CREAR_USER,
        payload: respuesta.data
    });
};

export const updatePatient = (patient) => async dispatch => {
    const respuesta = await axios.put(urlApi + "updatePatient", patient, optionHeaders);
    dispatch({
        type: ACTUALIZAR_USER,
        payload: patient
    });
};