import { CREAR_USER, ACTUALIZAR_USER } from "./types.js";
import axios from "axios";
import { optionHeaders } from './headers.js';
import { URL } from './url.js';

export const crearPatient = (user) => async dispatch => {
  const respuesta = await axios.post(URL + "createPatient", user, optionHeaders);
  dispatch({
    type: CREAR_USER,
    payload: respuesta.data
  });

  return respuesta.data;
};

export const updatePatient = (patient) => async dispatch => {
    const respuesta = await axios.put(URL + "updatePatient", patient, optionHeaders);
    dispatch({
        type: ACTUALIZAR_USER,
        payload: patient
    });
};