import { Injectable, NotFoundException } from '@nestjs/common';
import { JobOrder, JobSpecifications } from '../common/types';

@Injectable()
export class JobOrdersService {
  private jobOrders: JobOrder[] = [
    {
      id: 1,
      jobId: 'JO-2025-00001',
      clientId: 1,
      status: 'submitted',
      specifications: {
        productType: 'carton',
        quantity: 1000,
        dimensions: '20x15x10 cm',
        material: 'Kraft',
        finish: 'matte',
        notes: 'Rush order',
      },
      createdAt: new Date().toISOString(),
    },
    {
      id: 2,
      jobId: 'JO-2025-00002',
      clientId: 2,
      status: 'approved',
      specifications: {
        productType: 'plastic',
        quantity: 500,
      },
      createdAt: new Date().toISOString(),
      approvedAt: new Date().toISOString(),
    },
  ];

  private nextId = 3;

  findAll(jobId?: string): JobOrder[] {
    if (jobId !== undefined && jobId !== '') {
      return this.jobOrders.filter((j) => j.jobId === jobId);
    }
    return this.jobOrders;
  }

  findOne(id: string): JobOrder {
    const numId = Number(id);
    const order =
      !Number.isNaN(numId) && typeof numId === 'number'
        ? this.jobOrders.find((j) => j.id === numId)
        : this.jobOrders.find((j) => String(j.id) === id);
    if (!order) {
      throw new NotFoundException(`JobOrder ${id} not found`);
    }
    return order;
  }

  create(body: Omit<JobOrder, 'id'>): JobOrder {
    const now = new Date().toISOString();
    const newOrder: JobOrder = {
      id: this.nextId++,
      ...body,
      specifications: body.specifications as JobSpecifications,
      createdAt: body.createdAt ?? now,
    };
    this.jobOrders.push(newOrder);
    return newOrder;
  }

  update(id: string, body: Partial<JobOrder>): JobOrder {
    const order = this.findOne(id);
    const updated = { ...order, ...body };
    const idx = this.jobOrders.findIndex(
      (j) => String(j.id) === id || j.id === Number(id),
    );
    if (idx >= 0) this.jobOrders[idx] = updated;
    return updated;
  }
}
