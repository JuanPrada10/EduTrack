import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioEntity } from './entity/usuario.entity';
import { Repository } from 'typeorm';
import { CreateUsuarioDto } from './dto/createUsuario.dto';
import { UpdateUsuarioDto } from './dto/updateUsuario.dto';
import type { UUID } from 'crypto';
import bcrypt from 'bcrypt';
import { ConfigModule } from '@nestjs/config';

@Injectable()
export class UsuarioService {
  private readonly logger = new Logger('UsuarioService');
  constructor(
    @InjectRepository(UsuarioEntity)
    private userRepositoy: Repository<UsuarioEntity>,
  ) {}

  async findAll() {
    try {
      const users = await this.userRepositoy.find();
      if (!users || users.length === 0) {
        throw new NotFoundException('No hay usuarios registrados');
      }
      return users;
    } catch (error) {
      this.handlerError(error);
    }
    return;
  }

  async findOne(id: UUID) {
    try {
      const userFound = await this.userRepositoy.findOneBy({ id });
      if (!userFound) {
        throw new NotFoundException('Usuario no encontrado');
      }
      return userFound;
    } catch (error) {
      this.handlerError(error);
    }
  }

  async create(user: CreateUsuarioDto) {
    const { password, ...userData } = user;
    try {
      const newUser = await this.userRepositoy.create({
        ...userData,
        password: bcrypt.hashSync(password, Number(process.env.BCRYPT_SALT)),
      });
      await this.userRepositoy.save(newUser);
      return {
        user: {
          ...userData,
        },
        message: 'Usuario creado exitosamente',
      };
    } catch (error) {
      this.handlerError(error);
    }
  }

  async update(user: UpdateUsuarioDto, id: UUID) {
    try {
      const newUser = await this.userRepositoy.preload({
        id: id,
        ...user,
      });
      if (!newUser) {
        throw new NotFoundException('Usuario no encontrado');
      }
      if (user.password) {
        newUser.password = bcrypt.hashSync(user.password, 10);
      }
      await this.userRepositoy.save(newUser);
      return {
        message: 'Usuario actualizado exitosamente',
      };
    } catch (error) {
      this.handlerError(error);
    }
  }

  async delete(id: UUID) {
    try {
      await this.userRepositoy.delete({ id });
      return {
        message: 'Usuario eliminado exitosamente',
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
