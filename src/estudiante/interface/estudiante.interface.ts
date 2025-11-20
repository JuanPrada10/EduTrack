import { InscripcionEntity } from "src/inscripcion/entity/inscripciones.entity";
import { UsuarioEntity } from "src/usuario/entity/usuario.entity";

export interface Estudiante {
    id?: string;
    ano_ingreso: number;
    usuario: UsuarioEntity;
    inscripciones?: InscripcionEntity[];
}