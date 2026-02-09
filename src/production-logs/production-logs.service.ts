import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductionLog } from '../common/types';
import { ProductionLogEntity } from '../entities';

function toLog(e: ProductionLogEntity): ProductionLog {
  return {
    id: e.id,
    jobOrderId: e.jobOrderId,
    shiftId: e.shiftId,
    quantityProduced: e.quantityProduced,
    notes: e.notes ?? undefined,
    loggedAt: e.loggedAt?.toISOString?.() ?? new Date().toISOString(),
  };
}

@Injectable()
export class ProductionLogsService {
  constructor(
    @InjectRepository(ProductionLogEntity)
    private readonly repo: Repository<ProductionLogEntity>,
  ) {}

  async findAll(jobOrderId?: string): Promise<ProductionLog[]> {
    const where = jobOrderId ? { jobOrderId: Number(jobOrderId) } : {};
    const list = await this.repo.find({ where, order: { id: 'ASC' } });
    return list.map(toLog);
  }

  async create(body: Omit<ProductionLog, 'id'>): Promise<ProductionLog> {
    const entity = this.repo.create({
      jobOrderId: Number(body.jobOrderId),
      shiftId: Number(body.shiftId),
      quantityProduced: body.quantityProduced ?? 0,
      notes: body.notes ?? null,
      loggedAt: body.loggedAt ? new Date(body.loggedAt) : new Date(),
    });
    const saved = await this.repo.save(entity);
    return toLog(saved);
  }
}
