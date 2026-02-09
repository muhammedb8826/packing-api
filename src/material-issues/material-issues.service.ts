import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MaterialIssue } from '../common/types';
import { MaterialIssueEntity } from '../entities';

function toIssue(e: MaterialIssueEntity): MaterialIssue {
  return {
    id: e.id,
    jobOrderId: e.jobOrderId,
    materialId: e.materialId,
    quantity: Number(e.quantity),
    issuedAt: e.issuedAt?.toISOString?.() ?? new Date().toISOString(),
  };
}

@Injectable()
export class MaterialIssuesService {
  constructor(
    @InjectRepository(MaterialIssueEntity)
    private readonly repo: Repository<MaterialIssueEntity>,
  ) {}

  async findAll(jobOrderId?: string): Promise<MaterialIssue[]> {
    const where = jobOrderId ? { jobOrderId: Number(jobOrderId) } : {};
    const list = await this.repo.find({ where, order: { id: 'ASC' } });
    return list.map(toIssue);
  }

  async create(body: Omit<MaterialIssue, 'id'>): Promise<MaterialIssue> {
    const entity = this.repo.create({
      jobOrderId: Number(body.jobOrderId),
      materialId: Number(body.materialId),
      quantity: body.quantity,
      issuedAt: body.issuedAt ? new Date(body.issuedAt) : new Date(),
    });
    const saved = await this.repo.save(entity);
    return toIssue(saved);
  }
}
