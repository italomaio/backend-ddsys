import { UsuarioService } from './usuario.service';
import { Request, Response } from 'express';
import { UsuarioDto } from './dto/usuario.dto';
export declare class UsuarioController {
    private readonly usuarioService;
    constructor(usuarioService: UsuarioService);
    create(body: UsuarioDto, req: Request, res: Response): Promise<import("express-serve-static-core").Response>;
}
