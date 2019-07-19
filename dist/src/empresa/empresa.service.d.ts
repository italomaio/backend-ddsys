import { EmpresaDto } from './dto/empresa.dto';
export declare class EmpresaService {
    private readonly bd;
    private readonly UsuarioModel;
    private readonly EmpresaModel;
    constructor(bd: any, UsuarioModel: any, EmpresaModel: any);
    create(empresa: EmpresaDto): Promise<object>;
}
