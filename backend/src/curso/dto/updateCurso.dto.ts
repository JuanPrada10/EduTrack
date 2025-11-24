import { IsOptional, IsString, IsInt, Min, Max, IsUUID } from "class-validator";

export class UpdateCursoDto{
    @IsOptional()
    @IsString()
    nombre?: string;

    @IsOptional()
    @IsString()
    descripcion?: string;

    @IsOptional()
    @IsInt()
    @Min(1)
    @Max(20)
    creditos?: number;

    @IsOptional()
    @IsUUID()
    profesorId?: string;
}