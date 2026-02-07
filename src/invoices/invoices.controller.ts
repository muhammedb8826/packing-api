import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { InvoicesService } from './invoices.service';

@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Get()
  findAll(@Query('jobOrderId') jobOrderId?: string) {
    return this.invoicesService.findAll(jobOrderId);
  }

  @Post()
  create(@Body() body: Record<string, unknown>) {
    return this.invoicesService.create(body);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: Record<string, unknown>) {
    return this.invoicesService.update(id, body);
  }
}
