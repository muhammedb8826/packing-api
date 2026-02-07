import { Injectable } from '@nestjs/common';
import { ProductionLog } from '../common/types';

@Injectable()
export class ProductionLogsService {
  private logs: ProductionLog[] = [];
  private nextId = 1;

  findAll(jobOrderId?: string): ProductionLog[] {
    if (jobOrderId !== undefined && jobOrderId !== '') {
      return this.logs.filter(
        (l) => String(l.jobOrderId) === String(jobOrderId),
      );
    }
    return this.logs;
  }

  create(body: Omit<ProductionLog, 'id'>): ProductionLog {
    const now = new Date().toISOString();
    const newLog: ProductionLog = {
      id: this.nextId++,
      ...body,
      loggedAt: (body.loggedAt as string) ?? now,
    };
    this.logs.push(newLog);
    return newLog;
  }
}
