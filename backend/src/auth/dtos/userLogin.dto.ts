import { IsEmail, IsString } from 'class-validator';

export class UserLoginDto {
  @IsEmail({}, { message: 'Correo no valido' })
  email: string;
  @IsString({ message: 'La contrasena debe ser una cadena de texto' })
  password: string;
}
