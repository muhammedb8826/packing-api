import { Module } from '@nestjs/common';
import { LaborAssignmentsController } from './labor-assignments.controller';
import { LaborAssignmentsService } from './labor-assignments.service';

@Module({
  controllers: [LaborAssignmentsController],
  providers: [LaborAssignmentsService],
  exports: [LaborAssignmentsService],
})
export class LaborAssignmentsModule {}
