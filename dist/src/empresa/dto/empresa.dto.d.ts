export declare class EmpresaDto {
    empresaId?: number;
    razaoSocial: string;
    nomeFantasia: string;
    cnpj: string;
    enderecoId?: number;
    dominio?: string;
    ativo?: boolean;
    logotipo?: string;
    logotipo_mini?: string;
    dataCadastro?: Date;
    temaId?: number;
    endereco: EnderecoDto;
}
export declare class EnderecoDto {
    enderecoId?: number;
    logradouro: string;
    numero: number;
    complemento: string;
    estadoId?: number;
    municipioId?: number;
    bairro: string;
    cep: string;
}
