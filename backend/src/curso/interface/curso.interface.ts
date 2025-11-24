import { InscripcionEntity } from "src/inscripcion/entity/inscripciones.entity";
import { ProfesorEntity } from "src/profesor/entity/profesor.entity";

export class Curso{
    id?: string;
    nombre: string;
    descripcion: string;
    creditos: number;
    profesor: ProfesorEntity;
    inscripciones?: InscripcionEntity[];
}