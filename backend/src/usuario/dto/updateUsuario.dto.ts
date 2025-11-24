import { IsEmail, IsEnum, IsOptional, IsString, Length } from 'class-validator';
import { RolType } from '../interface/rolTypes';

export class UpdateUsuarioDto {
  @IsOptional()
  @IsString({ message: 'El nombre completo debe ser una cadena de texto' })
  @Length(3, 50, { message: 'El nombre es muy corto' })
  nombre_completo: string;

  @IsOptional()
  @IsEmail({}, { message: 'Correo no valido' })
  correo: string;

  @IsOptional()
  @IsString()
  @Length(8, 50, {
    message: 'La contrasena debe tener entre 8 y 50 caracteres',
  })
  contrasena: string;

  @IsOptional()
  @IsEnum(RolType, { message: 'Rol no valido' })
  rol: RolType;
}
