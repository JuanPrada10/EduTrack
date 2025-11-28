import { RolType } from 'src/usuario/interface/rolTypes';

export interface Payload {
  id: string;
  rol: RolType;
  email: string;
  fullName: string;
}
