import { Module } from '@nestjs/common';
import { CursoController } from './curso.controller';
import { CursoService } from './curso.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CursoEntity } from './entity/curso.entity';
import { ProfesorEntity } from 'src/profesor/entity/profesor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CursoEntity, ProfesorEntity])],
  controllers: [CursoController],
  providers: [CursoService],
})
export class CursoModule {}
