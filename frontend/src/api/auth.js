import axios from "axios";

const API = "http://localhost:3001";

export const LoginRequest = (user) => axios.post(`${API}/auth/login`, user);

export const RegisterRequest = (user) =>
  axios.post(`${API}/auth/register`, user);

export const createTipoUsuario = (user, rol) =>
  axios.post(`${API}/${rol}`, user);
