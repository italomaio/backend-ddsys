import { UsuarioDto } from './dto/usuario.dto';
export declare class UsuarioService {
    private readonly bd;
    private readonly UsuarioModel;
    private readonly EmpresaModel;
    constructor(bd: any, UsuarioModel: any, EmpresaModel: any);
    create(usuario: UsuarioDto): Promise<object>;
}
