import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { EstudianteService } from './estudiante.service';
import { Estudiante } from './interface/estudiante.interface';
import type { UUID } from 'crypto';
import { CreateEstudianteDto } from './dto/createEstudiante.dto';
import { UpdateEstudianteDto } from './dto/updateEstudiante.dto';

@Controller('estudiante')
export class EstudianteController {
    constructor(private readonly estudianteService: EstudianteService){}

    @Get()
    getEstudiantes(): Promise<Estudiante[]> {
        return this.estudianteService.findAll();
    }

    @Get(':id')
    getEstudiante(@Param('id', ParseUUIDPipe) id: UUID): Promise<Estudiante | null> {
        return this.estudianteService.findOne(id);
    }

    @Post()
    createEstudiante(@Body() newEstudiante: CreateEstudianteDto): Promise<Estudiante> {
        return this.estudianteService.create(newEstudiante);
    }

    @Patch(':id')
    updateEstudiante(
        @Body() estudiante: UpdateEstudianteDto,
        @Param('id', ParseUUIDPipe) id: UUID,
    ){
        return this.estudianteService.update(estudiante, id);
    }

    @Delete(':id')
    deleteEstudiante(@Param('id', ParseUUIDPipe) id:UUID) {
        return this.estudianteService.delete(id);
    }
}
