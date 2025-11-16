import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioEntity } from './entity/usuario.entity';
import { Repository } from 'typeorm';
import { Usuario } from './interface/usuario.interface';
import { CreateUsuarioDto } from './dto/createUsuario.dto';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(UsuarioEntity)
    private userRepositoy: Repository<UsuarioEntity>,
  ) {}

  createUser(user: CreateUsuarioDto) {
    const newUser = this.userRepositoy.create(user);
    return this.userRepositoy.save(newUser);
  }
}
