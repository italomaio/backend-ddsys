import { Controller, Body, Req, Res, HttpException, HttpStatus, Post, Param, Get, Put } from '@nestjs/common';
import { EmpresaDto } from './dto/empresa.dto';
import { EmpresaService } from './empresa.service';
import { Request, Response } from 'express';
import { identity } from 'rxjs';

@Controller('empresa')
export class EmpresaController {
    constructor(
        private readonly empresaService: EmpresaService
    ) {}

    @Post()
    public async create(@Body() body: EmpresaDto, @Req() req: Request, @Res() res: Response) {
        try {
            const empresa = this.empresaService.create(body);
            return res.status(HttpStatus.OK).json(empresa);
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
    }

    @Get(':id')
    public async findOne(@Param('id') id : number, @Req() req: Request, @Res() res: Response) {
        try {
            const empresa = await this.empresaService.findOne(id);
            return res.status(HttpStatus.OK).json(empresa);
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
    }

    @Put(':id')
    public async update(@Param('id') id : number, @Body() body: EmpresaDto, @Req() req: Request, @Res() res: Response) {
        try {
            const empresa = await this.empresaService.update(body, id);
            return res.status(HttpStatus.OK).json(empresa);
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
    }
}
