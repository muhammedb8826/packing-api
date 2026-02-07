import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { QcRecord } from '../common/types';
import { QcRecordsService } from './qc-records.service';

@Controller('qcRecords')
export class QcRecordsController {
  constructor(private readonly qcRecordsService: QcRecordsService) {}

  @Get()
  findAll(@Query('jobOrderId') jobOrderId?: string) {
    return this.qcRecordsService.findAll(jobOrderId);
  }

  @Post()
  create(@Body() body: Record<string, unknown>) {
    return this.qcRecordsService.create(body as Omit<QcRecord, 'id'>);
  }
}
