import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfesorEntity } from 'src/profesor/entity/profesor.entity';
import { Repository } from 'typeorm';
import { CursoEntity } from './entity/curso.entity';
import { CreateCursoDto } from './dto/createCurso.dto';
import { UUID } from 'crypto';
import { UpdateCursoDto } from './dto/updateCurso.dto';

@Injectable()
export class CursoService {
  private readonly logger = new Logger('CursoService');
  constructor(
    @InjectRepository(CursoEntity)
    private readonly cursoRepository: Repository<CursoEntity>,

    @InjectRepository(ProfesorEntity)
    private readonly profesorRepository: Repository<ProfesorEntity>,
  ) {}

  async findAll() {
    try {
      const cursos = await this.cursoRepository.find({
        relations: ['profesor', 'inscripciones'],
      });
      if (!cursos || cursos.length === 0) {
        throw new BadRequestException('No hay cursos registrados');
      }
      return cursos;
    } catch (error) {
      this.handlerError(error);
    }
  }

  async findOne(id: string) {
    try {
      const curso = await this.cursoRepository.findOne({
        where: { id },
        relations: ['profesor', 'inscripciones'],
      });
      if (!curso) {
        throw new BadRequestException('Curso no encontrado');
      }
      return curso;
    } catch (error) {
      this.handlerError(error);
    }
  }

  async create(data: CreateCursoDto) {
    try {
      const profesor = await this.profesorRepository.findOne({
        where: { id: data.profesorId },
      });
      if (!profesor) {
        throw new BadRequestException('El profesor no existe');
      }

      const newCurso = this.cursoRepository.create({
        nombre: data.nombre,
        descripcion: data.descripcion,
        creditos: data.creditos,
        profesor,
      });

      await this.cursoRepository.save(newCurso);
      return {
        message: 'Curso creado exitosamente',
        curso: newCurso,
      };
    } catch (error) {
      this.handlerError(error);
    }
  }

  async update(curso: UpdateCursoDto, id: UUID) {
    try {
      const updated = await this.cursoRepository.preload({
        id: id,
        ...curso,
      });
      if (!updated) {
        throw new BadRequestException('Curso no encontrado');
      }
      await this.cursoRepository.save(updated);
      return {
        message: 'Curso actualizado exitosamente',
        curso: updated,
      };
    } catch (error) {
      this.handlerError(error);
    }
  }

  async delete(id: UUID) {
    try {
      const result = await this.cursoRepository.delete({ id });
      if (result.affected === 0) {
        throw new BadRequestException('Curso no encontrado');
      }
      return {
        message: 'Curso eliminado exitosamente',
      };
    } catch (error) {
      this.handlerError(error);
    }
  }

  private handlerError(error: any) {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }
    this.logger.error(error);
    throw new BadRequestException(error.message);
  }
}
