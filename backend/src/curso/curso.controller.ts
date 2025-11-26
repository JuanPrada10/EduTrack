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
import { CursoService } from './curso.service';
import type { UUID } from 'crypto';
import { CreateCursoDto } from './dto/createCurso.dto';
import { UpdateCursoDto } from './dto/updateCurso.dto';
import { Curso } from './interface/curso.interface';
import { Auth } from 'src/auth/decorators/auth/auth.decorator';
import { RolType } from 'src/usuario/interface/rolTypes';

@Controller('curso')
export class CursoController {
  constructor(private readonly cursoService: CursoService) {}

  @Get()
  @Auth()
  getCursos() {
    return this.cursoService.findAll();
  }

  @Get(':id')
  @Auth()
  getCurso(@Param('id', ParseUUIDPipe) id: UUID) {
    return this.cursoService.findOne(id);
  }

  @Post()
  @Auth(RolType.ADMIN, RolType.PROFESOR)
  createCurso(@Body() newCurso: CreateCursoDto) {
    return this.cursoService.create(newCurso);
  }

  @Patch(':id')
  @Auth(RolType.ADMIN, RolType.PROFESOR)
  updateCurso(
    @Body() curso: UpdateCursoDto,
    @Param('id', ParseUUIDPipe) id: UUID,
  ) {
    return this.cursoService.update(curso, id);
  }

  @Delete(':id')
  @Auth(RolType.ADMIN)
  deleteCurso(@Param('id', ParseUUIDPipe) id: UUID) {
    return this.cursoService.delete(id);
  }
}
