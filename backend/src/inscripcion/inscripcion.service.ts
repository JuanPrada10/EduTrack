import { BadRequestException, Injectable } from '@nestjs/common';
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
    constructor(
        @InjectRepository(InscripcionEntity)
        private readonly inscripcionRepository: Repository<InscripcionEntity>,

        @InjectRepository(EstudianteEntity)
        private readonly estudianteRepository: Repository<EstudianteEntity>,

        @InjectRepository(CursoEntity)
        private readonly cursoRepository: Repository<CursoEntity>
    ){}

    findAll(){
        return this.inscripcionRepository.find({
            relations: ['estudiante', 'curso'],
        });
    }

    findOne(id: string){
        return this.inscripcionRepository.findOne({
            where: {id},
            relations: ['estudiante', 'curso'],
        });
    }

    async create(data: CreateInscripcionDto){
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
        return this.inscripcionRepository.save(newInscripcion);
    }


    update(inscripcion: UpdateInscripcionDto, id: UUID) {
        return this.inscripcionRepository.update({ id }, {...inscripcion});
    }

    delete(id: UUID) {
        return this.inscripcionRepository.delete({ id });
    }
}
