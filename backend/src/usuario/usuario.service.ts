import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioEntity } from './entity/usuario.entity';
import { Repository } from 'typeorm';
import { CreateUsuarioDto } from './dto/createUsuario.dto';
import { UpdateUsuarioDto } from './dto/updateUsuario.dto';
import type { UUID } from 'crypto';
import { Usuario } from './interface/usuario.interface';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(UsuarioEntity)
    private userRepositoy: Repository<UsuarioEntity>,
  ) {}

  findAll() {
    return this.userRepositoy.find();
  }

  findOne(id: UUID) {
    return this.userRepositoy.findOneBy({ id });
  }

  create(user: CreateUsuarioDto) {
    const newUser = this.userRepositoy.create(user);
    return this.userRepositoy.save(newUser);
  }

  update(user: UpdateUsuarioDto, id: UUID) {
    return this.userRepositoy.update({ id }, { ...user });
  }

  delete(id: UUID) {
    return this.userRepositoy.delete({ id });
  }
}
