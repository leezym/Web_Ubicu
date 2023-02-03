import { CREAR_EJERCICIO, ELIMINAR_EJERCICIO, ACTUALIZAR_EJERCICIO, MOSTRAR_EJERCICIOS } from "./types.js";
import axios from "axios";

//json online
const urlOnline = "https://my-json-server.typicode.com/carsua/productosTest/productos/";
// json local json server
/*const urlLocal = "http://127.0.0.1:5000/";*/
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
    const respuesta = await axios.put(urlApi + ejercicio.id, ejercicio, optionHeaders).then(
        datos = await axios.get(urlApi)
    );
    console.log(datos);
    dispatch({
        type: ACTUALIZAR_EJERCICIO,
        payload: datos.data
    });
};