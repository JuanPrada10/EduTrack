import { Module } from '@nestjs/common';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from './entity/usuario.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [UsuarioController],
  imports: [ConfigModule, TypeOrmModule.forFeature([UsuarioEntity])],
  providers: [UsuarioService],
  exports: [UsuarioService, TypeOrmModule],
})
export class UsuarioModule {}
