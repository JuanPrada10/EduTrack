import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { CursoService } from './curso.service';
import type { UUID } from 'crypto';
import { CreateCursoDto } from './dto/createCurso.dto';
import { UpdateCursoDto } from './dto/updateCurso.dto';
import { Curso } from './interface/curso.interface';

@Controller('curso')
export class CursoController {
    constructor(private readonly cursoService: CursoService) {}

     @Get()
    getCursos(): Promise<Curso[]> {
        return this.cursoService.findAll();
    }

    @Get(':id')
    getCurso(@Param('id', ParseUUIDPipe) id: UUID): Promise<Curso | null> {
        return this.cursoService.findOne(id);
    }

    @Post()
    createCurso(@Body() newCurso: CreateCursoDto): Promise<Curso> {
        return this.cursoService.create(newCurso);
    }

    @Patch(':id')
    updateCurso(
        @Body() curso: UpdateCursoDto,
        @Param('id', ParseUUIDPipe) id: UUID,
    ) {
        return this.cursoService.update(curso, id);
    }

    @Delete(':id')
    deleteCurso(@Param('id', ParseUUIDPipe) id: UUID) {
        return this.cursoService.delete(id);
    }
}
