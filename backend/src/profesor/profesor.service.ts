import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfesorEntity } from './entity/profesor.entity';
import { Repository } from 'typeorm';
import { UUID } from 'crypto';
import { CreateProfesorDto } from './dto/createProfesor.dto';
import { UsuarioEntity } from 'src/usuario/entity/usuario.entity';
import { UpdateProfesorDto } from './dto/updateProfesor.dto';

@Injectable()
export class ProfesorService {
  private readonly logger = new Logger('ProfesorService');
  constructor(
    @InjectRepository(ProfesorEntity)
    private readonly profesorRepository: Repository<ProfesorEntity>,

    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
  ) {}

  async findAll() {
    try {
      const profesors = await this.profesorRepository.find();
      if (!profesors || profesors.length === 0) {
        throw new BadRequestException('No hay profesores registrados');
      }
      return profesors;
    } catch (error) {
      this.handlerError(error);
    }
  }

  async findOne(id: UUID) {
    try {
      const userFound = await this.profesorRepository.findOneBy({ id });
      if (!userFound) {
        throw new BadRequestException('Profesor no encontrado');
      }
      return userFound;
    } catch (error) {
      this.handlerError(error);
    }
  }

  async create(data: CreateProfesorDto) {
    try {
      const usuario = await this.usuarioRepository.findOne({
        where: { id: data.usuarioId },
      });

      if (!usuario) {
        throw new BadRequestException('El usuario no existe');
      }
      if (usuario.rol === 'estudiante') {
        throw new BadRequestException('El usuario no puede ser estudiante');
      }

      const newProfesor = this.profesorRepository.create({
        especialidad: data.especialidad,
        usuario: usuario,
      });

      await this.profesorRepository.save(newProfesor);
      return {
        message: 'Profesor creado exitosamente',
        profesor: newProfesor,
      };
    } catch (error) {
      this.handlerError(error);
    }
  }

  async update(profesor: UpdateProfesorDto, id: UUID) {
    try {
      const updatedProfesor = await this.profesorRepository.preload({
        id: id,
        ...profesor,
      });
      if (!updatedProfesor) {
        throw new BadRequestException('Profesor no encontrado');
      }
      await this.profesorRepository.save(updatedProfesor);
      return {
        message: 'Profesor actualizado exitosamente',
        profesor: updatedProfesor,
      };
    } catch (error) {
      this.handlerError(error);
    }
  }

  async delete(id: UUID) {
    try {
      const result = await this.profesorRepository.delete({ id });
      if (result.affected === 0) {
        throw new BadRequestException('Profesor no encontrado');
      }
      return {
        message: 'Profesor eliminado exitosamente',
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
