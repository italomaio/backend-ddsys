import { Module } from '@nestjs/common';
import { EmpresaController } from './empresa.controller';
import { EmpresaService } from './empresa.service';
import { DatabaseModule } from '../database/database.module';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [DatabaseModule, CommonModule],
  controllers: [EmpresaController],
  providers: [EmpresaService]
})
export class EmpresaModule {}
