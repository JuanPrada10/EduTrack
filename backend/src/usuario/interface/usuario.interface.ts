import { RolType } from './rolTypes';

export interface Usuario {
  id?: string;
  fullName: string;
  email: string;
  password: string;
  rol: RolType;
}
