import { Module } from '@nestjs/common';
import { ProductionLogsController } from './production-logs.controller';
import { ProductionLogsService } from './production-logs.service';

@Module({
  controllers: [ProductionLogsController],
  providers: [ProductionLogsService],
  exports: [ProductionLogsService],
})
export class ProductionLogsModule {}
