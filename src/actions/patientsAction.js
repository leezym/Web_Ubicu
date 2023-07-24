import { CREAR_USER, ELIMINAR_USER, ACTUALIZAR_USER, MOSTRAR_USERS, GET_USER } from "./types.js";
import axios from "axios";
import { optionHeaders } from './headers.js';

// json local json server
//const urlLocal = "http://localhost:5000/";
const urlLocal = "https://server.ubicu.co/";

const urlApi = urlLocal;

export const mostrarPatients = (id_user) => async dispatch => {
    const respuesta = await axios.post(urlApi + "getPatientbyUser", id_user);
    dispatch({
        type: MOSTRAR_USERS,
        payload: respuesta.data
    });
};

export const crearPatient = (user) => async dispatch => {
    const respuesta = await axios.post(urlApi + "createPatient", user, optionHeaders);
    dispatch({
        type: CREAR_USER,
        payload: respuesta.data
    });
};

export const deletePatient = (cedula) => async dispatch => {
    const respuesta = await axios.post(urlApi + "deletePatient", cedula, optionHeaders);
    console.log(respuesta.data);
    dispatch({
        type: ELIMINAR_USER,
        payload: cedula
    });
};

export const updatePatient = (product) => async dispatch => {
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

export const getPatientbyId = (id_patient) => async dispatch => {
    const respuesta = await axios.post(urlApi + "getPatientbyId", id_patient);
    dispatch({
        type: GET_USER,
        payload: respuesta.data
    });
    return respuesta.data;
};

export const getPatientbyCc = (cedula) => async dispatch => {
    const respuesta = await axios.post(urlApi + "getPatientbyCc", cedula);
    dispatch({
        type: GET_USER,
        payload: respuesta.data
    });
    return respuesta.data;
};