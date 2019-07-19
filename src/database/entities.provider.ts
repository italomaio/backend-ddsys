import Usuario from './models/usuario.model';
import Empresa from './models/empresa.model';
import EnderecoEmpresa from './models/association/endereco.empresa.model';
import Endereco from './models/endereco.model';

export const entitiesProvider = [
    {
        provide: 'UsuarioModel',
        useValue: Usuario
    },
    {
        provide: 'EmpresaModel',
        useValue: Empresa
    },
    {
        provide: 'EnderecoModel',
        useValue: Endereco
    },
    {
        provide: 'EnderecoEmpresaModel',
        useValue: EnderecoEmpresa
    }
];
