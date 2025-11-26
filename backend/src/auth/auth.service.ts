import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUsuarioDto } from 'src/usuario/dto/updateUsuario.dto';
import { UsuarioEntity } from 'src/usuario/entity/usuario.entity';
import { UsuarioService } from 'src/usuario/usuario.service';
import { Repository } from 'typeorm';
import { UserLoginDto } from './dtos/userLogin.dto';
import bcrypt from 'bcrypt';
import { NotFoundError } from 'rxjs';
import { JwtService } from '@nestjs/jwt/dist/jwt.service';
import { Payload } from './interface/payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsuarioEntity)
    private usuarioRepository: Repository<UsuarioEntity>,
    private readonly usuarioService: UsuarioService,
    private readonly jwtService: JwtService,
  ) {}

  async login(userData: UserLoginDto) {
    const { email, password } = userData;
    const userFind = await this.usuarioRepository.findOne({
      select: { id: true, email: true, password: true },
      where: { email },
    });

    if (!userFind) throw new NotFoundError('Usuario no encontrado');
    const isPasswordValid = await bcrypt.compare(password, userFind.password);
    if (!isPasswordValid)
      throw new UnauthorizedException('Contrasena incorrecta');

    const payLoad: Payload = {
      id: userFind.id,
      email: userFind.email,
      rol: userFind.rol,
    };
    return {
      token: await this.jwtService.sign(payLoad),
    };
  }
}
