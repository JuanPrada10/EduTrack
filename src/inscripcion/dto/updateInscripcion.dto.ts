import { IsOptional, IsNumber, Min, Max } from "class-validator";

export class UpdateInscripcionDto{
    @IsOptional()
    @IsNumber()
    @Min(0)
    @Max(5)
    nota?: number;
}