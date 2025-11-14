import { Module } from '@nestjs/common';
import { CursoController } from './curso.controller';
import { CursoService } from './curso.service';

@Module({
  controllers: [CursoController],
  providers: [CursoService]
})
export class CursoModule {}
