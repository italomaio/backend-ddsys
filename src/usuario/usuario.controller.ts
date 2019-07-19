import { Controller, Get, Post, Res, Req, Body, Param, HttpException, HttpStatus, Put, Delete, UseGuards, Query } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { Request, Response } from 'express';
import { UsuarioDto } from './dto/usuario.dto';
import { ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { UsuarioFilterDto } from './dto/usuario.filter.dto';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { UserRoles } from './enum/roles.enum';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/shared/guards/roles.guard';

@Controller('usuario')
export class UsuarioController {
    constructor(
        private readonly usuarioService: UsuarioService
    ) {}

    @Post()
    @ApiOperation({ title: 'Register new user' })
    @ApiBearerAuth()
    @Roles(UserRoles.ADMINISTRADOR, UserRoles.SUPER_USUARIO)
    @UseGuards(AuthGuard(), RolesGuard)
    public async create(@Body() body: UsuarioDto, @Req() req: Request, @Res() res: Response) {
        try {
            const usuario = await this.usuarioService.create(body);
            return res.status(200).json(usuario);
        } catch (error) {
            return res.status(500).send(error);
        }
    }

    @Get()
    @ApiOperation({ title: 'Get all users (with filters or not)' })
    @ApiBearerAuth()
    @Roles(UserRoles.ADMINISTRADOR, UserRoles.SUPER_USUARIO)
    @UseGuards(AuthGuard(), RolesGuard)
    public async findAll(@Query() filtro : UsuarioFilterDto, @Req() req: Request, @Res() res: Response) {
        try {

            const { role, empresaId } = req['user'].dataValues;
            filtro.empresaId = role !== UserRoles.SUPER_USUARIO ? 
                               empresaId :
                               filtro.empresaId || null;

            console.log(role, empresaId, filtro)

            const _user = await this.usuarioService.findAll(filtro);
            return res.status(HttpStatus.OK).json(_user);
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
    }

    @Get(':id')
    @ApiOperation({ title: 'Find user by id' })
    @ApiBearerAuth()
    @Roles(UserRoles.ADMINISTRADOR, UserRoles.SUPER_USUARIO)
    @UseGuards(AuthGuard(), RolesGuard)
    public async findById(@Param('id') id : number, @Req() req: Request, @Res() res: Response) {
        try {
            const _user = await this.usuarioService.findById(id);
            return res.status(HttpStatus.OK).json(_user);
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
    }

    @Put(':id')
    @ApiOperation({ title: 'Update user by id' })
    @ApiBearerAuth()
    @Roles(UserRoles.ADMINISTRADOR, UserRoles.SUPER_USUARIO)
    @UseGuards(AuthGuard(), RolesGuard)
    public async update(@Param('id') id : number, @Body() usuario : UsuarioDto, @Req() req: Request, @Res() res: Response) {
        try {
            const _user = await this.usuarioService.update(id, usuario);
            return res.status(HttpStatus.OK).json(_user);
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
    }

    @Delete(':id')
    @ApiOperation({ title: 'Delete user by id' })
    @ApiBearerAuth()
    @Roles(UserRoles.ADMINISTRADOR, UserRoles.SUPER_USUARIO)
    @UseGuards(AuthGuard(), RolesGuard)
    public async delete(@Param('id') id : number, @Req() req: Request, @Res() res: Response) {
        try {
            const _deleted = await this.usuarioService.delete(id);
            return res.status(HttpStatus.OK).json(_deleted);
        } catch (error) {
            console.log(error)
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
    }

}
