import { SetMetadata } from '@nestjs/common';
import { RolType } from 'src/usuario/interface/rolTypes';

export const META_ROLES = 'ROLES';

export const RolProtected = (...args: RolType[]) =>
  SetMetadata(META_ROLES, args);
