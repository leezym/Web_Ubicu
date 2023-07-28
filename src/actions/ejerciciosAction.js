import { CREAR_EJERCICIO, ELIMINAR_EJERCICIO, ACTUALIZAR_EJERCICIO, MOSTRAR_EJERCICIOS, GET_EJERCICIO } from "./types.js";
import axios from "axios";
import { optionHeaders } from './headers.js';

// json local json server
//const urlLocal = "http://localhost:5000/";
const urlLocal = "https://server.ubicu.co/";

const urlApi = urlLocal;


export const allEjerciciosByPatient = (id_user) => async dispatch => {
    const respuesta = await axios.post(urlApi + "allEjerciciosByPatient", id_user);
    dispatch({
        type: MOSTRAR_EJERCICIOS,
        payload: respuesta.data
    });
    return respuesta.data;
};

export const crearEjercicio = (ejercicio) => async dispatch => {
    const respuesta = await axios.post(urlApi + "createEjercicio", ejercicio, optionHeaders);
    dispatch({
        type: CREAR_EJERCICIO,
        payload: respuesta.data
    });
};

export const deleteEjercicio = (cedula) => async dispatch => {
    const respuesta = await axios.post(urlApi + "deleteEjercicio", cedula, optionHeaders);
    console.log(respuesta.data);
    dispatch({
        type: ELIMINAR_EJERCICIO,
        payload: cedula
    });
};

export const updateEjercicio = (ejercicio) => async dispatch => {
    const respuesta = await axios.put(urlApi + "updateEjercicio", ejercicio, optionHeaders);
    dispatch({
        type: ACTUALIZAR_EJERCICIO,
        payload: ejercicio
    });
};

export const getEjerciciobyId = (id_ejercicio) => async dispatch => {
    const respuesta = await axios.post(urlApi + "getEjerciciobyId", id_ejercicio);
    dispatch({
        type: GET_EJERCICIO,
        payload: respuesta.data
    });
};