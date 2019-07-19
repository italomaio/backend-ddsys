import { UserRoles } from "src/usuario/enum/roles.enum";
import { ReflectMetadata } from "@nestjs/common";

export const Roles = (...roles: UserRoles[]) => ReflectMetadata('roles', roles);