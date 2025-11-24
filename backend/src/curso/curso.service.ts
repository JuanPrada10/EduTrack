import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfesorEntity } from 'src/profesor/entity/profesor.entity';
import { Repository } from 'typeorm';
import { CursoEntity } from './entity/curso.entity';
import { CreateCursoDto } from './dto/createCurso.dto';
import { UUID } from 'crypto';
import { UpdateCursoDto } from './dto/updateCurso.dto';

@Injectable()
export class CursoService {
    constructor(
        @InjectRepository(CursoEntity)
        private readonly cursoRepository: Repository<CursoEntity>,

        @InjectRepository(ProfesorEntity)
        private readonly profesorRepository: Repository<ProfesorEntity>,
    ){}

    findAll(){
        return this.cursoRepository.find({
            relations: ['profesor', 'inscripciones'],
        });
    }

    findOne(id: string){
        return this.cursoRepository.findOne({
            where: { id },
            relations: ['profesor', 'inscripciones']
        });
    }

    async create(data: CreateCursoDto){
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

        return this.cursoRepository.save(newCurso);
    }

    update(curso: UpdateCursoDto, id: UUID){
        return this.cursoRepository.update({ id }, {...curso});
    }

    delete(id: UUID) {
        return this.cursoRepository.delete({ id });
    }
}
