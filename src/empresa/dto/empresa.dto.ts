import { ApiModelProperty } from "@nestjs/swagger";
import { EnderecoDto } from "src/shared/dto/endereco.dto";
import { UsuarioDto } from "src/usuario/dto/usuario.dto";

export class EmpresaDto {

    @ApiModelProperty()
    empresaId?: number;

    @ApiModelProperty()
    razaoSocial: string;

    @ApiModelProperty()
    nomeFantasia: string;

    @ApiModelProperty()
    cnpj: string;

    @ApiModelProperty()
    enderecoId?: number;

    @ApiModelProperty()
    dominio?: string;

    @ApiModelProperty()
    ativo?: boolean;

    @ApiModelProperty()
    logotipo?: string;

    @ApiModelProperty()
    logotipo_mini?: string;

    @ApiModelProperty()
    dataCadastro?: Date;

    @ApiModelProperty()
    temaId?: number;
    
    @ApiModelProperty()
    endereco: EnderecoDto[];

    @ApiModelProperty()
    usuario: UsuarioDto;
}