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

@Controller('profesor')
export class ProfesorController {
  constructor(private readonly profesorService: ProfesorService) {}

  @Get()
  getProfesores() {
    return this.profesorService.findAll();
  }

  @Get(':id')
  getProfesor(@Param('id', ParseUUIDPipe) id: UUID) {
    return this.profesorService.findOne(id);
  }

  @Post()
  createProfesor(@Body() newProfesor: CreateProfesorDto) {
    return this.profesorService.create(newProfesor);
  }

  @Patch(':id')
  updateProfesor(
    @Body() profesor: UpdateProfesorDto,
    @Param('id', ParseUUIDPipe) id: UUID,
  ) {
    return this.profesorService.update(profesor, id);
  }

  @Delete(':id')
  deleteProfesor(@Param('id', ParseUUIDPipe) id: UUID) {
    return this.profesorService.delete(id);
  }
}
