import { MOSTRAR_RESULTS } from "./types.js";
import axios from "axios";

//json online
const urlOnline = "https://my-json-server.typicode.com/carsua/productosTest/productos/";
// json local json server
//const urlLocal = "http://127.0.0.1:5000/";
const urlLocal = "https://server.ubicu.co/";



const urlApi = urlLocal;

const optionHeaders = {
    headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token')
    }
};


export const allResultsByUser = (id_ejercicio) => async dispatch => {
    const respuesta = await axios.post(urlApi + "allResultsByUser", id_ejercicio);
    console.log(respuesta.data);
    dispatch({
        type: MOSTRAR_RESULTS,
        payload: respuesta.data
    });
};