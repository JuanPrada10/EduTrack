import { UsuarioEntity } from "src/usuario/entity/usuario.entity";

export interface Profesor {
    id?: string;
    especialidad: string;
    usuario: UsuarioEntity;

}