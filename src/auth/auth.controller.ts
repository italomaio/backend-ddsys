import { Controller, Get, Post, Req, Res, UseGuards, HttpException, HttpStatus, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiImplicitBody, ApiUseTags, ApiOperation } from '@nestjs/swagger';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {}

    @Post()
    @ApiOperation({ title: 'Sign in method' })
    public async login(@Body() usuario : AuthDto) {
        try {
            return await this.authService.login(usuario);
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
    }
}
