import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JobOrder, JobSpecifications } from '../common/types';
import { JobOrderEntity } from '../entities';

function toJobOrder(e: JobOrderEntity): JobOrder {
  return {
    id: e.id,
    jobId: e.jobId,
    clientId: e.clientId,
    status: e.status as JobOrder['status'],
    specifications: e.specifications as JobSpecifications,
    createdAt: e.createdAt?.toISOString?.() ?? new Date().toISOString(),
    approvedAt: e.approvedAt?.toISOString?.() ?? undefined,
    assignedToProduction: e.assignedToProduction,
    assignedToHR: e.assignedToHR,
    hrReady: e.hrReady,
    inventoryReady: e.inventoryReady,
    productionStarted: e.productionStarted,
    qcStatus: e.qcStatus ?? undefined,
    dispatchReady: e.dispatchReady,
    dispatchedAt: e.dispatchedAt?.toISOString?.() ?? undefined,
    financialCompleted: e.financialCompleted,
  };
}

@Injectable()
export class JobOrdersService {
  constructor(
    @InjectRepository(JobOrderEntity)
    private readonly repo: Repository<JobOrderEntity>,
  ) {}

  async findAll(jobId?: string): Promise<JobOrder[]> {
    const where = jobId ? { jobId } : {};
    const list = await this.repo.find({ where, order: { id: 'ASC' } });
    return list.map(toJobOrder);
  }

  async findOne(id: string): Promise<JobOrder> {
    const numId = Number(id);
    const entity =
      !Number.isNaN(numId) && numId > 0
        ? await this.repo.findOne({ where: { id: numId } })
        : null;
    if (!entity) throw new NotFoundException(`JobOrder ${id} not found`);
    return toJobOrder(entity);
  }

  async create(body: Omit<JobOrder, 'id'>): Promise<JobOrder> {
    const entity = this.repo.create({
      jobId: body.jobId,
      clientId: Number(body.clientId),
      status: body.status,
      specifications: body.specifications as JobOrderEntity['specifications'],
      approvedAt: body.approvedAt ? new Date(body.approvedAt) : null,
      assignedToProduction: body.assignedToProduction ?? false,
      assignedToHR: body.assignedToHR ?? false,
      hrReady: body.hrReady ?? false,
      inventoryReady: body.inventoryReady ?? false,
      productionStarted: body.productionStarted ?? false,
      qcStatus: body.qcStatus ?? null,
      dispatchReady: body.dispatchReady ?? false,
      dispatchedAt: body.dispatchedAt ? new Date(body.dispatchedAt) : null,
      financialCompleted: body.financialCompleted ?? false,
    });
    const saved = await this.repo.save(entity);
    return toJobOrder(saved);
  }

  private toBoolean(value: unknown): boolean {
    if (typeof value === 'boolean') return value;
    if (value === null || value === undefined) return false;
    if (typeof value === 'string')
      return value !== '' && value !== 'false' && value !== '0';
    return Boolean(value);
  }

  async update(id: string, body: Partial<JobOrder>): Promise<JobOrder> {
    const entity = await this.repo.findOne({
      where: { id: Number(id) },
    });
    if (!entity) throw new NotFoundException(`JobOrder ${id} not found`);
    const {
      specifications,
      approvedAt,
      dispatchedAt,
      assignedToProduction,
      assignedToHR,
      hrReady,
      inventoryReady,
      productionStarted,
      dispatchReady,
      financialCompleted,
      ...rest
    } = body;
    Object.assign(entity, rest);
    if (specifications)
      entity.specifications =
        specifications as JobOrderEntity['specifications'];
    if (approvedAt !== undefined)
      entity.approvedAt = approvedAt ? new Date(approvedAt) : null;
    if (dispatchedAt !== undefined)
      entity.dispatchedAt = dispatchedAt ? new Date(dispatchedAt) : null;
    if (assignedToProduction !== undefined)
      entity.assignedToProduction = this.toBoolean(assignedToProduction);
    if (assignedToHR !== undefined)
      entity.assignedToHR = this.toBoolean(assignedToHR);
    if (hrReady !== undefined) entity.hrReady = this.toBoolean(hrReady);
    if (inventoryReady !== undefined)
      entity.inventoryReady = this.toBoolean(inventoryReady);
    if (productionStarted !== undefined)
      entity.productionStarted = this.toBoolean(productionStarted);
    if (dispatchReady !== undefined)
      entity.dispatchReady = this.toBoolean(dispatchReady);
    if (financialCompleted !== undefined)
      entity.financialCompleted = this.toBoolean(financialCompleted);
    await this.repo.save(entity);
    return toJobOrder(entity);
  }
}
