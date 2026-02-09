import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductionLogEntity } from '../entities';
import { ProductionLogsController } from './production-logs.controller';
import { ProductionLogsService } from './production-logs.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductionLogEntity])],
  controllers: [ProductionLogsController],
  providers: [ProductionLogsService],
  exports: [ProductionLogsService],
})
export class ProductionLogsModule {}
