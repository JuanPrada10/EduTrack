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
import { EstudianteService } from './estudiante.service';
import type { UUID } from 'crypto';
import { CreateEstudianteDto } from './dto/createEstudiante.dto';
import { UpdateEstudianteDto } from './dto/updateEstudiante.dto';
import { Auth } from 'src/auth/decorators/auth/auth.decorator';
import { RolType } from 'src/usuario/interface/rolTypes';

@Controller('estudiante')
export class EstudianteController {
  constructor(private readonly estudianteService: EstudianteService) {}

  @Get()
  @Auth(RolType.ADMIN)
  getEstudiantes() {
    return this.estudianteService.findAll();
  }

  @Get(':id')
  @Auth()
  getEstudiante(@Param('id', ParseUUIDPipe) id: UUID) {
    return this.estudianteService.findOne(id);
  }

  @Post()
  createEstudiante(@Body() newEstudiante: CreateEstudianteDto) {
    return this.estudianteService.create(newEstudiante);
  }

  @Patch(':id')
  @Auth(RolType.ADMIN, RolType.ESTUDIANTE)
  updateEstudiante(
    @Body() estudiante: UpdateEstudianteDto,
    @Param('id', ParseUUIDPipe) id: UUID,
  ) {
    return this.estudianteService.update(estudiante, id);
  }

  @Delete(':id')
  @Auth(RolType.ADMIN)
  deleteEstudiante(@Param('id', ParseUUIDPipe) id: UUID) {
    return this.estudianteService.delete(id);
  }
}
