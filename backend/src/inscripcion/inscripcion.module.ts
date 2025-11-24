import { Module } from '@nestjs/common';
import { InscripcionController } from './inscripcion.controller';
import { InscripcionService } from './inscripcion.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InscripcionEntity } from './entity/inscripciones.entity';
import { EstudianteEntity } from 'src/estudiante/entity/estudiante.entity';
import { CursoEntity } from 'src/curso/entity/curso.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InscripcionEntity, EstudianteEntity, CursoEntity])],
  controllers: [InscripcionController],
  providers: [InscripcionService],
})
export class InscripcionModule {}
