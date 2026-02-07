import { Injectable } from '@nestjs/common';
import { MaterialIssue } from '../common/types';

@Injectable()
export class MaterialIssuesService {
  private issues: MaterialIssue[] = [];
  private nextId = 1;

  findAll(jobOrderId?: string): MaterialIssue[] {
    if (jobOrderId !== undefined && jobOrderId !== '') {
      return this.issues.filter(
        (i) => String(i.jobOrderId) === String(jobOrderId),
      );
    }
    return this.issues;
  }

  create(body: Omit<MaterialIssue, 'id'>): MaterialIssue {
    const now = new Date().toISOString();
    const newIssue: MaterialIssue = {
      id: this.nextId++,
      ...body,
      issuedAt: (body.issuedAt as string) ?? now,
    };
    this.issues.push(newIssue);
    return newIssue;
  }
}
