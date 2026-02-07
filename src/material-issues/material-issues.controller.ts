import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { MaterialIssue } from '../common/types';
import { MaterialIssuesService } from './material-issues.service';

@Controller('materialIssues')
export class MaterialIssuesController {
  constructor(private readonly materialIssuesService: MaterialIssuesService) {}

  @Get()
  findAll(@Query('jobOrderId') jobOrderId?: string) {
    return this.materialIssuesService.findAll(jobOrderId);
  }

  @Post()
  create(@Body() body: Record<string, unknown>) {
    return this.materialIssuesService.create(body as Omit<MaterialIssue, 'id'>);
  }
}
