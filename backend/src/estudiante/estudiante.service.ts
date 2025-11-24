import { BadRequestException, Injectable } from '@nestjs/common';
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
    constructor(
        @InjectRepository(EstudianteEntity)
        private readonly estudianteRepository: Repository<EstudianteEntity>,

        @InjectRepository(UsuarioEntity)
        private readonly usuarioRepository: Repository<UsuarioEntity>,

        @InjectRepository(InscripcionEntity)
        private readonly inscripcionRepository: Repository<InscripcionEntity>,
    ){}

    findAll(){
        return this.estudianteRepository.find({
            relations: ['usuario', 'inscripciones'],
        });
    }

    findOne(id: string){
        return this.estudianteRepository.findOne({
            where: { id },
            relations: ['usuario', 'inscripciones'],
        });
    }

    async create(data: CreateEstudianteDto){
        const usuario = await this.usuarioRepository.findOne({
            where: { id: data.usuarioId },
        });
        if (!usuario){
            throw new BadRequestException('Usuario no existe');
        }

        const newEstudiante = this.estudianteRepository.create({
            ano_ingreso: data.ano_ingreso,
            usuario: usuario,
        });
        return this.estudianteRepository.save(newEstudiante);
    }

    update(estudiante: UpdateEstudianteDto, id: UUID){
        return this.estudianteRepository.update({ id }, {...estudiante});
    }

    delete(id: UUID){
        return this.estudianteRepository.delete({ id });
    }
}
