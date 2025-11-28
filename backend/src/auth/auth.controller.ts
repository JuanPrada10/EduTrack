import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUsuarioDto } from 'src/usuario/dto/createUsuario.dto';
import { UserLoginDto } from './dtos/userLogin.dto';
import { UsuarioService } from 'src/usuario/usuario.service';

import { RolType } from 'src/usuario/interface/rolTypes';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly UsuarioService: UsuarioService,
  ) {}

  @Post('register')
  registerUser(@Body() user: CreateUsuarioDto) {
    return this.UsuarioService.create(user);
  }
  @Post('login')
  loginUser(@Body() user: UserLoginDto) {
    return this.authService.login(user);
  }
}
