import { IsInt, Min, Max, IsUUID } from "class-validator";

export class CreateEstudianteDto {
    @IsInt()
    @Min(1900)
    @Max(new Date().getFullYear())
    ano_ingreso: number;

    @IsUUID()
    usuarioId: string;
}