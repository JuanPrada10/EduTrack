import { CursoEntity } from "src/curso/entity/curso.entity";
import { EstudianteEntity } from "src/estudiante/entity/estudiante.entity";

export class Inscripcion{
    id?: string;
    fecha_inscripcion?: Date;
    nota: number;
    estudiante: EstudianteEntity;
    curso: CursoEntity;
}