import { Module } from '@nestjs/common';
import { InscripcionController } from './inscripcion.controller';
import { InscripcionService } from './inscripcion.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InscripcionEntity } from './entity/inscripciones.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InscripcionEntity])],
  controllers: [InscripcionController],
  providers: [InscripcionService],
})
export class InscripcionModule {}
