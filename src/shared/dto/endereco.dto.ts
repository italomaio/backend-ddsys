import { ApiModelProperty } from "@nestjs/swagger";

export class EnderecoDto {

    @ApiModelProperty()
    enderecoId?: number;

    @ApiModelProperty()
    logradouro: string;

    @ApiModelProperty()
    numero: number;

    @ApiModelProperty()
    complemento: string;

    @ApiModelProperty()
    estadoId?: number;

    @ApiModelProperty()
    municipioId?: number;

    @ApiModelProperty()
    bairro: string;

    @ApiModelProperty()
    cep: string;
}