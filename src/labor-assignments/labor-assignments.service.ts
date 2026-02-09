import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LaborAssignment } from '../common/types';
import { LaborAssignmentEntity } from '../entities';

function toAssignment(e: LaborAssignmentEntity): LaborAssignment {
  return {
    id: e.id,
    jobOrderId: e.jobOrderId,
    employeeId: e.employeeId,
    shiftId: e.shiftId,
    assignedAt: e.assignedAt?.toISOString?.() ?? new Date().toISOString(),
  };
}

@Injectable()
export class LaborAssignmentsService {
  constructor(
    @InjectRepository(LaborAssignmentEntity)
    private readonly repo: Repository<LaborAssignmentEntity>,
  ) {}

  async findAll(jobOrderId?: string): Promise<LaborAssignment[]> {
    const where = jobOrderId ? { jobOrderId: Number(jobOrderId) } : {};
    const list = await this.repo.find({ where, order: { id: 'ASC' } });
    return list.map(toAssignment);
  }

  async create(body: Omit<LaborAssignment, 'id'>): Promise<LaborAssignment> {
    const entity = this.repo.create({
      jobOrderId: Number(body.jobOrderId),
      employeeId: Number(body.employeeId),
      shiftId: Number(body.shiftId),
      assignedAt: body.assignedAt ? new Date(body.assignedAt) : new Date(),
    });
    const saved = await this.repo.save(entity);
    return toAssignment(saved);
  }

  async remove(id: string): Promise<void> {
    const numId = Number(id);
    if (Number.isNaN(numId))
      throw new NotFoundException(`LaborAssignment ${id} not found`);
    const result = await this.repo.delete({ id: numId });
    if (result.affected === 0)
      throw new NotFoundException(`LaborAssignment ${id} not found`);
  }
}
