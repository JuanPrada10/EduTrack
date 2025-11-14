import { RolType } from './rolTypes';

export interface Usuario {
  id?: string;
  nombre_completo: string;
  correo: string;
  contrasena: string;
  rol: RolType;
}
