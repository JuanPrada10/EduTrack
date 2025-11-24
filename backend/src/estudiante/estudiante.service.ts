import { BadRequestException, Injectable } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EstudianteEntity } from './entity/estudiante.entity';
import { UsuarioEntity } from 'src/usuario/entity/usuario.entity';
import { InscripcionEntity } from 'src/inscripcion/entity/inscripciones.entity';
import { CreateEstudianteDto } from './dto/createEstudiante.dto';
import { UpdateEstudianteDto } from './dto/updateEstudiante.dto';
import { UUID } from 'crypto';

@Injectable()
export class EstudianteService {
  private readonly logger = new Logger('EstudianteService');
  constructor(
    @InjectRepository(EstudianteEntity)
    private readonly estudianteRepository: Repository<EstudianteEntity>,

    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,

    @InjectRepository(InscripcionEntity)
    private readonly inscripcionRepository: Repository<InscripcionEntity>,
  ) {}

  async findAll() {
    try {
      const estudiantes = await this.estudianteRepository.find({
        relations: ['usuario', 'inscripciones'],
      });
      if (!estudiantes || estudiantes.length === 0) {
        throw new BadRequestException('No hay estudiantes registrados');
      }
      return estudiantes;
    } catch (error) {
      this.handlerError(error);
    }
  }

  async findOne(id: string) {
    try {
      const estudiante = await this.estudianteRepository.findOne({
        where: { id },
        relations: ['usuario', 'inscripciones'],
      });
      if (!estudiante) {
        throw new BadRequestException('Estudiante no encontrado');
      }
      return estudiante;
    } catch (error) {
      this.handlerError(error);
    }
  }

  async create(data: CreateEstudianteDto) {
    try {
      const usuario = await this.usuarioRepository.findOne({
        where: { id: data.usuarioId },
      });

      if (!usuario) {
        throw new BadRequestException('Usuario no existe');
      }

      if (usuario.rol === 'profesor') {
        throw new BadRequestException('El usuario no puede ser profesor');
      }

      const newEstudiante = this.estudianteRepository.create({
        ano_ingreso: data.ano_ingreso,
        usuario: usuario,
      });
      await this.estudianteRepository.save(newEstudiante);
      return {
        message: 'Estudiante creado exitosamente',
        estudiante: newEstudiante,
      };
    } catch (error) {
      this.handlerError(error);
    }
  }

  async update(estudiante: UpdateEstudianteDto, id: UUID) {
    try {
      const updated = await this.estudianteRepository.preload({
        id: id,
        ...estudiante,
      });
      if (!updated) {
        throw new BadRequestException('Estudiante no encontrado');
      }
      await this.estudianteRepository.save(updated);
      return {
        message: 'Estudiante actualizado exitosamente',
        estudiante: updated,
      };
    } catch (error) {
      this.handlerError(error);
    }
  }

  async delete(id: UUID) {
    try {
      const result = await this.estudianteRepository.delete({ id });
      if (result.affected === 0) {
        throw new BadRequestException('Estudiante no encontrado');
      }
      return {
        message: 'Estudiante eliminado exitosamente',
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
