import { IsOptional, IsString, Length } from "class-validator";

export class UpdateProfesorDto {
    @IsOptional()
    @IsString()
    @Length(3, 50)
    especialidad?: string;
}
