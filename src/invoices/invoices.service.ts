import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Invoice } from '../common/types';
import { InvoiceEntity } from '../entities';

function toInvoice(e: InvoiceEntity): Invoice {
  return {
    id: e.id,
    jobOrderId: e.jobOrderId,
    clientId: e.clientId,
    amount: Number(e.amount),
    type: e.type as Invoice['type'],
    status: e.status as Invoice['status'],
    paidAt: e.paidAt?.toISOString?.() ?? undefined,
    createdAt: e.createdAt?.toISOString?.() ?? new Date().toISOString(),
  };
}

@Injectable()
export class InvoicesService {
  constructor(
    @InjectRepository(InvoiceEntity)
    private readonly repo: Repository<InvoiceEntity>,
  ) {}

  async findAll(jobOrderId?: string): Promise<Invoice[]> {
    const where = jobOrderId ? { jobOrderId: Number(jobOrderId) } : {};
    const list = await this.repo.find({ where, order: { id: 'ASC' } });
    return list.map(toInvoice);
  }

  async findOne(id: string): Promise<Invoice> {
    const entity = await this.repo.findOne({
      where: { id: Number(id) },
    });
    if (!entity) throw new NotFoundException(`Invoice ${id} not found`);
    return toInvoice(entity);
  }

  async create(body: Partial<Invoice>): Promise<Invoice> {
    const entity = this.repo.create({
      jobOrderId: Number(body.jobOrderId!),
      clientId: Number(body.clientId!),
      amount: body.amount ?? 0,
      type: body.type ?? 'full',
      status: body.status ?? 'pending',
      paidAt: body.paidAt ? new Date(body.paidAt) : null,
    });
    const saved = await this.repo.save(entity);
    return toInvoice(saved);
  }

  async update(id: string, body: Partial<Invoice>): Promise<Invoice> {
    const entity = await this.repo.findOne({
      where: { id: Number(id) },
    });
    if (!entity) throw new NotFoundException(`Invoice ${id} not found`);
    const { paidAt, ...rest } = body;
    Object.assign(entity, rest);
    if (paidAt !== undefined) entity.paidAt = paidAt ? new Date(paidAt) : null;
    await this.repo.save(entity);
    return toInvoice(entity);
  }
}
