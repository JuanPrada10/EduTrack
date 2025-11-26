import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from 'src/usuario/entity/usuario.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt-strategy';
import { UsuarioModule } from 'src/usuario/usuario.module';

@Module({
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  imports: [
    ConfigModule,
    forwardRef(() => UsuarioModule),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([UsuarioEntity]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get('SECRET_JWT_KEY'),
          signOptions: {
            expiresIn: '1h',
          },
        };
      },
    }),
  ],
})
export class AuthModule {}
