import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { UsuarioModule } from './usuario/usuario.module';
import { EmpresaModule } from './empresa/empresa.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [DatabaseModule, AuthModule, UsuarioModule, EmpresaModule, CommonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
