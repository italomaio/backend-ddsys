import { UserRoles } from "../enum/roles.enum";
import { ApiModelProperty, ApiModelPropertyOptional } from "@nestjs/swagger";

export class UsuarioFilterDto {
    @ApiModelPropertyOptional()
    readonly nome?: string;
    @ApiModelPropertyOptional()
    readonly email?: string;
    @ApiModelPropertyOptional({ enum: ['ADMINISTRADOR', 'ADMINISTRATIVO', 'OPERACIONAL', 'CLIENTE']})
    readonly role?: UserRoles;
    @ApiModelPropertyOptional()
    empresaId?: number;
}