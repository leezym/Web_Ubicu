import { CREAR_EJERCICIO, ELIMINAR_EJERCICIO, ACTUALIZAR_EJERCICIO, MOSTRAR_EJERCICIOS } from "./types.js";
import axios from "axios";

// json local json server
//const urlLocal = "http://localhost:5000/";
const urlLocal = "https://server.ubicu.co/";

const urlApi = urlLocal;

const optionHeaders = {
    headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token')
    }
};

export const allEjerciciosByUser = (id_ejercicio) => async dispatch => {
    const respuesta = await axios.post(urlApi + "allEjerciciosByUser", id_ejercicio);
    console.log(respuesta);
    dispatch({
        type: MOSTRAR_EJERCICIOS,
        payload: respuesta.data
    });
};

export const crearEjercicio = (ejercicio) => async dispatch => {
    const respuesta = await axios.post(urlApi + "createEjercicio", ejercicio, optionHeaders);
    console.log(respuesta);
    dispatch({
        type: CREAR_EJERCICIO,
        payload: respuesta.data
    });
};

export const deleteEjercicio = (cedula) => async dispatch => {
    console.log(cedula);
    const respuesta = await axios.post(urlApi + "deleteEjercicio", cedula, optionHeaders);
    console.log(respuesta.data);
    dispatch({
        type: ELIMINAR_EJERCICIO,
        payload: cedula
    });
};

export const updateEjercicio = (ejercicio) => async dispatch => {
    console.log(ejercicio);
    let datos;
    const respuesta = await axios.put(urlApi + "updateEjercicio", ejercicio, optionHeaders).then(
        datos = await axios.post(urlApi + "allEjerciciosByUser", ejercicio.id_user)
    );
    console.log("datosupt:", datos);
    dispatch({
        type: ACTUALIZAR_EJERCICIO,
        payload: datos.data
    });
};