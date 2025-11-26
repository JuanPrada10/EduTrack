import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ProfesorService } from './profesor.service';
import { Profesor } from './interface/profesor.interface';
import type { UUID } from 'crypto';
import { CreateProfesorDto } from './dto/createProfesor.dto';
import { UpdateProfesorDto } from './dto/updateProfesor.dto';
import { Auth } from 'src/auth/decorators/auth/auth.decorator';
import { RolType } from 'src/usuario/interface/rolTypes';

@Controller('profesor')
export class ProfesorController {
  constructor(private readonly profesorService: ProfesorService) {}

  @Get()
  @Auth(RolType.ADMIN)
  getProfesores() {
    return this.profesorService.findAll();
  }

  @Get(':id')
  @Auth(RolType.ADMIN)
  getProfesor(@Param('id', ParseUUIDPipe) id: UUID) {
    return this.profesorService.findOne(id);
  }

  @Post()
  createProfesor(@Body() newProfesor: CreateProfesorDto) {
    return this.profesorService.create(newProfesor);
  }

  @Patch(':id')
  @Auth(RolType.ADMIN, RolType.PROFESOR)
  updateProfesor(
    @Body() profesor: UpdateProfesorDto,
    @Param('id', ParseUUIDPipe) id: UUID,
  ) {
    return this.profesorService.update(profesor, id);
  }

  @Delete(':id')
  @Auth(RolType.ADMIN)
  deleteProfesor(@Param('id', ParseUUIDPipe) id: UUID) {
    return this.profesorService.delete(id);
  }
}
