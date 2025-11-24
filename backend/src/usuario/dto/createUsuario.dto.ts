import { IsEmail, IsEnum, IsString, Length } from 'class-validator';
import { RolType } from '../interface/rolTypes';

export class CreateUsuarioDto {
  @IsString({ message: 'El nombre completo debe ser una cadena de texto' })
  @Length(3, 50, { message: 'El nombre es muy corto' })
  fullName: string;

  @IsEmail({}, { message: 'Correo no valido' })
  email: string;

  @IsString()
  @Length(3, 50, {
    message: 'La contrasena debe tener entre 3 y 50 caracteres',
  })
  password: string;

  @IsEnum(RolType, { message: 'Rol no valido' })
  rol: RolType;
}
