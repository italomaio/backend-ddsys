import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { DatabaseModule } from '../database/database.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [DatabaseModule, AuthModule],
  providers: [UsuarioService],
  controllers: [UsuarioController]
})
export class UsuarioModule {}
