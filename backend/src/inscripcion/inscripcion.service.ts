import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InscripcionEntity } from './entity/inscripciones.entity';
import { EstudianteEntity } from 'src/estudiante/entity/estudiante.entity';
import { CursoEntity } from 'src/curso/entity/curso.entity';
import { CreateInscripcionDto } from './dto/createInscripcion.dto';
import { UpdateInscripcionDto } from './dto/updateInscripcion.dto';
import { UUID } from 'crypto';

@Injectable()
export class InscripcionService {
  private readonly logger = new Logger('InscripcionService');
  constructor(
    @InjectRepository(InscripcionEntity)
    private readonly inscripcionRepository: Repository<InscripcionEntity>,

    @InjectRepository(EstudianteEntity)
    private readonly estudianteRepository: Repository<EstudianteEntity>,

    @InjectRepository(CursoEntity)
    private readonly cursoRepository: Repository<CursoEntity>,
  ) {}

  async findAll() {
    try {
      const inscripciones = await this.inscripcionRepository.find({
        relations: ['estudiante', 'curso'],
      });
      if (!inscripciones || inscripciones.length === 0) {
        throw new BadRequestException('No hay inscripciones registradas');
      }
      return inscripciones;
    } catch (error) {
      this.handlerError(error);
    }
  }

  async findOne(id: string) {
    try {
      const inscripcion = await this.inscripcionRepository.findOne({
        where: { id },
        relations: ['estudiante', 'curso'],
      });
      if (!inscripcion) {
        throw new BadRequestException('Inscripción no encontrada');
      }
      return inscripcion;
    } catch (error) {
      this.handlerError(error);
    }
  }

  async create(data: CreateInscripcionDto) {
    try {
      const estudiante = await this.estudianteRepository.findOne({
        where: { id: data.estudianteId },
      });
      if (!estudiante) {
        throw new BadRequestException('El estudiante no existe');
      }

      const curso = await this.cursoRepository.findOne({
        where: { id: data.cursoId },
      });

      if (!curso) {
        throw new BadRequestException('El curso no existe');
      }

      const newInscripcion = this.inscripcionRepository.create({
        estudiante,
        curso,
        nota: data.nota ?? 0,
      });
      await this.inscripcionRepository.save(newInscripcion);
      return {
        message: 'Inscripción creada exitosamente',
        inscripcion: newInscripcion,
      };
    } catch (error) {
      this.handlerError(error);
    }
  }

  async update(inscripcion: UpdateInscripcionDto, id: UUID) {
    try {
      const updated = await this.inscripcionRepository.preload({
        id: id,
        ...inscripcion,
      });
      if (!updated) {
        throw new BadRequestException('Inscripción no encontrada');
      }
      await this.inscripcionRepository.save(updated);
      return {
        message: 'Inscripción actualizada exitosamente',
        inscripcion: updated,
      };
    } catch (error) {
      this.handlerError(error);
    }
  }

  async delete(id: UUID) {
    try {
      const result = await this.inscripcionRepository.delete({ id });
      if (result.affected === 0) {
        throw new BadRequestException('Inscripción no encontrada');
      }
      return {
        message: 'Inscripción eliminada exitosamente',
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
