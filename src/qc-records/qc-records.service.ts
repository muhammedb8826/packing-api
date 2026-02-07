import { Injectable } from '@nestjs/common';
import { QcRecord } from '../common/types';

@Injectable()
export class QcRecordsService {
  private records: QcRecord[] = [];
  private nextId = 1;

  findAll(jobOrderId?: string): QcRecord[] {
    if (jobOrderId !== undefined && jobOrderId !== '') {
      return this.records.filter(
        (r) => String(r.jobOrderId) === String(jobOrderId),
      );
    }
    return this.records;
  }

  create(body: Omit<QcRecord, 'id'>): QcRecord {
    const now = new Date().toISOString();
    const newRecord: QcRecord = {
      id: this.nextId++,
      ...body,
      checkedAt: (body.checkedAt as string) ?? now,
    };
    this.records.push(newRecord);
    return newRecord;
  }
}
