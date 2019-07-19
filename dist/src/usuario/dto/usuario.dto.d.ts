import { UserRoles } from "../enum/roles.enum";
export declare class UsuarioDto {
    readonly nome: string;
    readonly email: string;
    readonly senha: string;
    readonly role: UserRoles;
    readonly empresaId?: number;
}
