import { Module } from '@nestjs/common';
import { InscripcionController } from './inscripcion.controller';
import { InscripcionService } from './inscripcion.service';

@Module({
  controllers: [InscripcionController],
  providers: [InscripcionService]
})
export class InscripcionModule {}
