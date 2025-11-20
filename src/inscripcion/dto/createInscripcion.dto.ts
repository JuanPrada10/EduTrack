import { IsUUID, IsOptional, IsNumber, Min, Max } from "class-validator";

export class CreateInscripcionDto{
    @IsUUID()
    estudianteId: string;

    @IsUUID()
    cursoId: string;

    @IsOptional()
    @IsNumber()
    @Min(0)
    @Max(5)
    nota?: number;
}