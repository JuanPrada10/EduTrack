import { Module } from '@nestjs/common';
import { EstudianteController } from './estudiante.controller';
import { EstudianteService } from './estudiante.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstudianteEntity } from './entity/estudiante.entity';
import { InscripcionEntity } from 'src/inscripcion/entity/inscripciones.entity';
import { UsuarioEntity } from 'src/usuario/entity/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EstudianteEntity, UsuarioEntity, InscripcionEntity])],
  controllers: [EstudianteController],
  providers: [EstudianteService],
})
export class EstudianteModule {}
