import { EmpresaDto } from './dto/empresa.dto';
import { EmpresaService } from './empresa.service';
import { Request, Response } from 'express';
export declare class EmpresaController {
    private readonly empresaService;
    constructor(empresaService: EmpresaService);
    create(body: EmpresaDto, req: Request, res: Response): Promise<void>;
}
