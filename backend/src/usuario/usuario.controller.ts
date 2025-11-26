import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Delete,
} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/createUsuario.dto';
import type { UUID } from 'crypto';

import { UpdateUsuarioDto } from './dto/updateUsuario.dto';
import { Auth } from 'src/auth/decorators/auth/auth.decorator';
import { RolType } from './interface/rolTypes';
@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Get()
  @Auth(RolType.ADMIN)
  getUsers() {
    return this.usuarioService.findAll();
  }

  @Get(':id')
  @Auth()
  getUser(@Param('id', ParseUUIDPipe) id: UUID) {
    return this.usuarioService.findOne(id);
  }

  @Post()
  createUser(@Body() newUser: CreateUsuarioDto) {
    return this.usuarioService.create(newUser);
  }

  @Patch(':id')
  @Auth(RolType.ADMIN)
  updateUser(
    @Body() user: UpdateUsuarioDto,
    @Param('id', ParseUUIDPipe) id: UUID,
  ) {
    return this.usuarioService.update(user, id);
  }

  @Delete(':id')
  @Auth(RolType.ADMIN)
  deleteUser(@Param('id', ParseUUIDPipe) id: UUID) {
    return this.usuarioService.delete(id);
  }
}
