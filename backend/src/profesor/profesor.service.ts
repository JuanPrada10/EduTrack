import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfesorEntity } from './entity/profesor.entity';
import { Repository } from 'typeorm';
import { UUID } from 'crypto';
import { CreateProfesorDto } from './dto/createProfesor.dto';
import { UsuarioEntity } from 'src/usuario/entity/usuario.entity';
import { UpdateProfesorDto } from './dto/updateProfesor.dto';

@Injectable()
export class ProfesorService {
    constructor(
        @InjectRepository(ProfesorEntity)
        private readonly profesorRepository: Repository<ProfesorEntity>,

        @InjectRepository(UsuarioEntity)
        private readonly usuarioRepository: Repository<UsuarioEntity>
    ) {}

    findAll() {
        return this.profesorRepository.find();
    }

    findOne(id: UUID) {
        return this.profesorRepository.findOneBy({ id });
    }

    async create(data: CreateProfesorDto) {
        const usuario = await this.usuarioRepository.findOne({ 
            where: { id: data.usuarioId },
         });

        if (!usuario) {
            throw new BadRequestException('El usuario no existe');
        }

        const newProfesor = this.profesorRepository.create({
            especialidad: data.especialidad,
            usuario: usuario,
        });

        return this.profesorRepository.save(newProfesor);
    }

    update(profesor: UpdateProfesorDto, id: UUID) {
        return this.profesorRepository.update({ id }, { ...profesor });
    }


    delete(id: UUID) {
        return this.profesorRepository.delete({ id });
    }
}
