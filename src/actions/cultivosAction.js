import {CREAR_CULTIVO, ELIMINAR_CULTIVO, ACTUALIZAR_CULTIVO, MOSTRAR_CULTIVOS} from "./types.js";
import axios from "axios";

//json online
/*const urlOnline = "https://my-json-server.typicode.com/carsua/productosTest/productos/";*/
// json local json server
/*const urlLocal = "http://127.0.0.1:5000/";*/
/*const urlLocal = "https://d2zqc0bdtc11lv.cloudfront.net/";*/
const urlLocal = "https://d2yaaz8bde1qj3.cloudfront.net/";

const urlApi = urlLocal;

const optionHeaders = { 
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('token')
        }
    };

export const allCultivosByUser = (id_user) => async dispatch  => {
    const respuesta = await axios.post(urlApi+"allCultivosByUser",id_user);
    console.log(respuesta);
    dispatch({
        type: MOSTRAR_CULTIVOS,
        payload: respuesta.data
    });
};

export const crearUser = (user) => async dispatch  => {
    const respuesta = await axios.post(urlApi+"createUser",user,optionHeaders);
    console.log(respuesta);
    dispatch({
        type: CREAR_CULTIVO,
        payload: respuesta.data
    });
};

export const deleteUser = (cedula) => async dispatch  => {
    console.log(cedula);
    const respuesta = await axios.post(urlApi+"deleteUser",cedula,optionHeaders);
    console.log(respuesta.data);
    dispatch({
        type: ELIMINAR_CULTIVO,
        payload: cedula
    });
};

export const updateUser = (product) => async dispatch  => {
    console.log(product);
    let datos;
    const respuesta = await axios.put(urlApi+product.id, product,optionHeaders).then(
        datos = await axios.get(urlApi)
    );
    console.log(datos);
    dispatch({
        type: ACTUALIZAR_CULTIVO,
        payload: datos.data
    });
};



