import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { CommonController } from './common.controller';
import { commonProviders } from './common.provider';

@Module({
  providers: [CommonService, ...commonProviders],
  controllers: [CommonController],
  exports: [...commonProviders]
})
export class CommonModule {}
