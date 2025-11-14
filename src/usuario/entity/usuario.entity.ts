import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { RolType } from '../interface/rolTypes';

@Entity({ name: 'usuarios' })
export class UsuarioEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  nombre_completo: string;

  @Column('text')
  correo: string;

  @Column('text')
  contrasena: string;

  @Column({ type: 'enum', enum: RolType })
  rol: RolType;
}
