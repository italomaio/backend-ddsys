import Usuario from './models/usuario.model';
import Empresa from './models/empresa.model';
export declare const entitiesProvider: ({
    provide: string;
    useValue: typeof Usuario;
} | {
    provide: string;
    useValue: typeof Empresa;
})[];
