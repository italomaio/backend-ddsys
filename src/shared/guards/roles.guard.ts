import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { UserRoles } from "src/usuario/enum/roles.enum";
import { UsuarioDto } from "src/usuario/dto/usuario.dto";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly _reflector : Reflector) {}

    canActivate(conext: ExecutionContext) : boolean | Promise<boolean> {
        const roles = this._reflector.get<UserRoles[]>('roles', conext.getHandler());

        if (!roles || roles.length === 0) {
            return true;
        }

        const request = conext.switchToHttp().getRequest();
        const user : UsuarioDto = request.user;

        const hasRole = () => roles.indexOf(user.role) > -1;
        if (user && user.role && hasRole()) {
            return true;
        }

        throw new HttpException("Você não tem permissão para acessar esse recurso.", HttpStatus.UNAUTHORIZED);
    }
}