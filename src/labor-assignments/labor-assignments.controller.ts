import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { LaborAssignment } from '../common/types';
import { LaborAssignmentsService } from './labor-assignments.service';

@Controller('laborAssignments')
export class LaborAssignmentsController {
  constructor(
    private readonly laborAssignmentsService: LaborAssignmentsService,
  ) {}

  @Get()
  findAll(@Query('jobOrderId') jobOrderId?: string) {
    return this.laborAssignmentsService.findAll(jobOrderId);
  }

  @Post()
  create(@Body() body: Record<string, unknown>) {
    return this.laborAssignmentsService.create(
      body as Omit<LaborAssignment, 'id'>,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.laborAssignmentsService.remove(id);
  }
}
