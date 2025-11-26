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
import { InscripcionService } from './inscripcion.service';
import type { UUID } from 'crypto';
import { CreateInscripcionDto } from './dto/createInscripcion.dto';
import { UpdateInscripcionDto } from './dto/updateInscripcion.dto';
import { Auth } from 'src/auth/decorators/auth/auth.decorator';
import { RolType } from 'src/usuario/interface/rolTypes';

@Controller('inscripcion')
export class InscripcionController {
  constructor(private readonly inscripcionService: InscripcionService) {}

  @Get()
  @Auth()
  getInscripciones() {
    return this.inscripcionService.findAll();
  }

  @Get(':id')
  @Auth()
  getInscripcion(@Param('id', ParseUUIDPipe) id: UUID) {
    return this.inscripcionService.findOne(id);
  }
  @Post()
  @Auth(RolType.ADMIN, RolType.ESTUDIANTE)
  createInscripcion(@Body() newInscripcion: CreateInscripcionDto) {
    return this.inscripcionService.create(newInscripcion);
  }

  @Patch(':id')
  @Auth(RolType.ADMIN, RolType.PROFESOR)
  updateInscripcion(
    @Body() inscripcion: UpdateInscripcionDto,
    @Param('id', ParseUUIDPipe) id: UUID,
  ) {
    return this.inscripcionService.update(inscripcion, id);
  }

  @Delete(':id')
  @Auth(RolType.ADMIN)
  deleteInscripcion(@Param('id', ParseUUIDPipe) id: UUID) {
    return this.inscripcionService.delete(id);
  }
}
