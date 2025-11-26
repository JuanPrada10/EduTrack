import { applyDecorators, UseGuards } from '@nestjs/common';
import { RolType } from 'src/usuario/interface/rolTypes';
import { RolProtected } from '../rol-protected/rol-protected.decorator';
import { UserRolesGuard } from 'src/auth/gurds/user-roles/user-roles.guard';
import { AuthGuard } from '@nestjs/passport';

export const Auth = (...roles: RolType[]) => {
  return applyDecorators(
    RolProtected(...roles),
    UseGuards(AuthGuard('jwt'), UserRolesGuard),
  );
};
