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
// import { Usuario } from './interface/usuario.interface';
import { UpdateUsuarioDto } from './dto/updateUsuario.dto';
@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Get()
  getUsers() {
    return this.usuarioService.findAll();
  }

  @Get(':id')
  getUser(@Param('id', ParseUUIDPipe) id: UUID) {
    return this.usuarioService.findOne(id);
  }

  @Post()
  createUser(@Body() newUser: CreateUsuarioDto) {
    return this.usuarioService.create(newUser);
  }

  @Patch(':id')
  updateUser(
    @Body() user: UpdateUsuarioDto,
    @Param('id', ParseUUIDPipe) id: UUID,
  ) {
    return this.usuarioService.update(user, id);
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseUUIDPipe) id: UUID) {
    return this.usuarioService.delete(id);
  }
}
