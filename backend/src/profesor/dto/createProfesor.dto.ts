import { IsString, IsUUID } from "class-validator";

export class CreateProfesorDto {
    @IsString()
    especialidad: string;

    @IsUUID()
    usuarioId: string;
}