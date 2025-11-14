import { IsEmail, IsEnum, IsString, Length } from 'class-validator';
import { RolType } from '../interface/rolTypes';

export class CreateUsuarioDto {
  @IsString({ message: 'El nombre completo debe ser una cadena de texto' })
  @Length(3, 50, { message: 'El nombre es muy corto' })
  nombre_completo: string;

  @IsEmail({}, { message: 'Correo no valido' })
  correo: string;

  @IsString()
  @Length(8, 50, {
    message: 'La contrasena debe tener entre 8 y 50 caracteres',
  })
  contrasena: string;

  @IsEnum(RolType, { message: 'Rol no valido' })
  rol: RolType;
}
