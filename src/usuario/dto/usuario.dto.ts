import { UserRoles } from "../enum/roles.enum";
import { ApiModelProperty, ApiModelPropertyOptional } from "@nestjs/swagger";

export class UsuarioDto {
    @ApiModelPropertyOptional()
    readonly nome?: string;
    @ApiModelProperty()
    readonly email: string;
    @ApiModelProperty()
    readonly senha: string;
    @ApiModelPropertyOptional({ enum: ['ADMINISTRADOR', 'ADMINISTRATIVO', 'OPERACIONAL', 'CLIENTE']})
    readonly role?: UserRoles;
    @ApiModelPropertyOptional()
    readonly empresaId?: number;
}