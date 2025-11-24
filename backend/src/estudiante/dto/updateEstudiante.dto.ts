import { IsOptional, IsInt, Min, Max } from "class-validator";

export class UpdateEstudianteDto {

  @IsOptional()
  @IsInt()
  @Min(1900)
  @Max(new Date().getFullYear())
  ano_ingreso?: number;
}
