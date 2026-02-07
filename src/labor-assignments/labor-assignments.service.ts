import { Injectable, NotFoundException } from '@nestjs/common';
import { LaborAssignment } from '../common/types';

@Injectable()
export class LaborAssignmentsService {
  private assignments: LaborAssignment[] = [];
  private nextId = 1;

  findAll(jobOrderId?: string): LaborAssignment[] {
    if (jobOrderId !== undefined && jobOrderId !== '') {
      return this.assignments.filter(
        (a) => String(a.jobOrderId) === String(jobOrderId),
      );
    }
    return this.assignments;
  }

  create(body: Omit<LaborAssignment, 'id'>): LaborAssignment {
    const now = new Date().toISOString();
    const newAssignment: LaborAssignment = {
      id: this.nextId++,
      ...body,
      assignedAt: (body.assignedAt as string) ?? now,
    };
    this.assignments.push(newAssignment);
    return newAssignment;
  }

  remove(id: string): void {
    const idx = this.assignments.findIndex(
      (a) => String(a.id) === id || a.id === Number(id),
    );
    if (idx < 0) {
      throw new NotFoundException(`LaborAssignment ${id} not found`);
    }
    this.assignments.splice(idx, 1);
  }
}
