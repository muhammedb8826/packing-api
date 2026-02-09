import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QcRecord } from '../common/types';
import { QcRecordEntity } from '../entities';

function toRecord(e: QcRecordEntity): QcRecord {
  return {
    id: e.id,
    jobOrderId: e.jobOrderId,
    result: e.result as QcRecord['result'],
    notes: e.notes ?? undefined,
    checkedAt: e.checkedAt?.toISOString?.() ?? new Date().toISOString(),
  };
}

@Injectable()
export class QcRecordsService {
  constructor(
    @InjectRepository(QcRecordEntity)
    private readonly repo: Repository<QcRecordEntity>,
  ) {}

  async findAll(jobOrderId?: string): Promise<QcRecord[]> {
    const where = jobOrderId ? { jobOrderId: Number(jobOrderId) } : {};
    const list = await this.repo.find({ where, order: { id: 'ASC' } });
    return list.map(toRecord);
  }

  async create(body: Omit<QcRecord, 'id'>): Promise<QcRecord> {
    const entity = this.repo.create({
      jobOrderId: Number(body.jobOrderId),
      result: body.result,
      notes: body.notes ?? null,
      checkedAt: body.checkedAt ? new Date(body.checkedAt) : new Date(),
    });
    const saved = await this.repo.save(entity);
    return toRecord(saved);
  }
}
