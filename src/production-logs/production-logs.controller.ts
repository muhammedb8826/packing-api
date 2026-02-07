import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ProductionLog } from '../common/types';
import { ProductionLogsService } from './production-logs.service';

@Controller('productionLogs')
export class ProductionLogsController {
  constructor(private readonly productionLogsService: ProductionLogsService) {}

  @Get()
  findAll(@Query('jobOrderId') jobOrderId?: string) {
    return this.productionLogsService.findAll(jobOrderId);
  }

  @Post()
  create(@Body() body: Record<string, unknown>) {
    return this.productionLogsService.create(body as Omit<ProductionLog, 'id'>);
  }
}
