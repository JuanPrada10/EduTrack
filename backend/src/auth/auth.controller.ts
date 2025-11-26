import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Req,
  SetMetadata,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUsuarioDto } from 'src/usuario/dto/createUsuario.dto';
import { UserLoginDto } from './dtos/userLogin.dto';
import { UsuarioService } from 'src/usuario/usuario.service';
import { AuthGuard } from '@nestjs/passport/dist/auth.guard';
import { GetUser } from './decorators/get-user/get-user.decorator';
import { RolType } from 'src/usuario/interface/rolTypes';
import { RolProtected } from './decorators/rol-protected/rol-protected.decorator';
import { UserRolesGuard } from './gurds/user-roles/user-roles.guard';

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

  @Get('getUserExpress')
  @UseGuards(AuthGuard('jwt'))
  getUserExpress(@Req() req: Express.Request) {
    return req.user;
  }

  @SetMetadata('ROLES', [RolType.ADMIN])
  @Get('getUserWithDecorator')
  @UseGuards(AuthGuard('jwt'))
  getUserWithDecorator(@GetUser() user) {
    return user;
  }

  @Get('private1')
  @RolProtected(RolType.ADMIN)
  @UseGuards(AuthGuard('jwt'), UserRolesGuard)
  getUserWithDecoratorAndGuard() {
    return { message: 'acceso permitido' };
  }
}
