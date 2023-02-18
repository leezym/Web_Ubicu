import { CREAR_USER, ELIMINAR_USER, ACTUALIZAR_USER, MOSTRAR_USERS, GET_USER } from "./types.js";
import axios from "axios";

// json local json server
const urlLocal = "http://localhost:5000/";
//const urlLocal = "https://server.ubicu.co/";

const urlApi = urlLocal;

const optionHeaders = {
    headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token')
    }
};

export const mostrarPatients = () => async dispatch => {
    const respuesta = await axios.get(urlApi + "allPatients", optionHeaders);
    console.log(respuesta);
    dispatch({
        type: MOSTRAR_USERS,
        payload: respuesta.data
    });
};

export const crearPatient = (user) => async dispatch => {
    const respuesta = await axios.post(urlApi + "createPatient", user, optionHeaders);
    console.log(respuesta);
    dispatch({
        type: CREAR_USER,
        payload: respuesta.data
    });
};

export const deletePatient = (cedula) => async dispatch => {
    console.log(cedula);
    const respuesta = await axios.post(urlApi + "deletePatient", cedula, optionHeaders);
    console.log(respuesta.data);
    dispatch({
        type: ELIMINAR_USER,
        payload: cedula
    });
};

export const updatePatient = (product) => async dispatch => {
    console.log(product);
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

export const getPatientbyId = (id_user) => async dispatch => {
    const respuesta = await axios.post(urlApi + "getPatientbyId", id_user);
    console.log(respuesta);
    dispatch({
        type: GET_USER,
        payload: respuesta.data
    });
};