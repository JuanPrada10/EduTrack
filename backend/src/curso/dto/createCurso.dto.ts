import { IsString, IsInt, Min, Max, IsUUID } from "class-validator";

export class CreateCursoDto{
    @IsString()
    nombre: string;

    @IsString()
    descripcion: string;

    @IsInt()
    @Min(1)
    @Max(20) // puedes ajustar si quieres
    creditos: number;

    @IsUUID()
    profesorId: string;
}