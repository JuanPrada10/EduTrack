import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { InscripcionService } from './inscripcion.service';
import type { UUID } from 'crypto';
import { Inscripcion } from './interface/inscripcion.interface';
import { CreateInscripcionDto } from './dto/createInscripcion.dto';
import path from 'path';
import { UpdateInscripcionDto } from './dto/updateInscripcion.dto';

@Controller('inscripcion')
export class InscripcionController {
    constructor(private readonly inscripcionService: InscripcionService){}

    @Get()
    getInscripciones(): Promise<Inscripcion[]> {
        return this.inscripcionService.findAll();
    }

    @Get(':id')
    getInscripcion(@Param('id', ParseUUIDPipe) id: UUID): Promise<Inscripcion | null>{
        return this.inscripcionService.findOne(id);
    }
    @Post()
    createInscripcion(@Body() newInscripcion: CreateInscripcionDto): Promise<Inscripcion> {
        return this.inscripcionService.create(newInscripcion);
    }

    @Patch(':id')
    updateInscripcion(
        @Body() inscripcion: UpdateInscripcionDto,
        @Param('id', ParseUUIDPipe) id: UUID,
    ){
        return this.inscripcionService.update(inscripcion, id);
    }

    @Delete(':id')
    deleteInscripcion(@Param('id', ParseUUIDPipe) id: UUID) {
        return this.inscripcionService.delete(id);
    }
}
