import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { JobOrder } from '../common/types';
import { JobOrdersService } from './job-orders.service';

@Controller('jobOrders')
export class JobOrdersController {
  constructor(private readonly jobOrdersService: JobOrdersService) {}

  @Get()
  findAll(@Query('jobId') jobId?: string) {
    return this.jobOrdersService.findAll(jobId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobOrdersService.findOne(id);
  }

  @Post()
  create(@Body() body: Record<string, unknown>) {
    return this.jobOrdersService.create(body as Omit<JobOrder, 'id'>);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: Record<string, unknown>) {
    return this.jobOrdersService.update(id, body);
  }
}
