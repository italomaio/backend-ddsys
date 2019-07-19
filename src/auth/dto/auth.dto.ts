import { ApiModelPropertyOptional, ApiModelProperty } from "@nestjs/swagger";

export class AuthDto {

    @ApiModelPropertyOptional()
    login?: string;

    @ApiModelPropertyOptional()
    email?: string;

    @ApiModelProperty()
    senha: string;
}