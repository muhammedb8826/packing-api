import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LaborAssignmentEntity } from '../entities';
import { LaborAssignmentsController } from './labor-assignments.controller';
import { LaborAssignmentsService } from './labor-assignments.service';

@Module({
  imports: [TypeOrmModule.forFeature([LaborAssignmentEntity])],
  controllers: [LaborAssignmentsController],
  providers: [LaborAssignmentsService],
  exports: [LaborAssignmentsService],
})
export class LaborAssignmentsModule {}
