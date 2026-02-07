import { Injectable, NotFoundException } from '@nestjs/common';
import { Invoice } from '../common/types';

@Injectable()
export class InvoicesService {
  private invoices: Invoice[] = [];
  private nextId = 1;

  findAll(jobOrderId?: string): Invoice[] {
    if (jobOrderId !== undefined && jobOrderId !== '') {
      return this.invoices.filter(
        (i) => String(i.jobOrderId) === String(jobOrderId),
      );
    }
    return this.invoices;
  }

  findOne(id: string): Invoice {
    const numId = Number(id);
    const invoice =
      !Number.isNaN(numId) && typeof numId === 'number'
        ? this.invoices.find((i) => i.id === numId)
        : this.invoices.find((i) => String(i.id) === id);
    if (!invoice) {
      throw new NotFoundException(`Invoice ${id} not found`);
    }
    return invoice;
  }

  create(body: Partial<Invoice>): Invoice {
    const now = new Date().toISOString();
    const newInvoice: Invoice = {
      id: this.nextId++,
      jobOrderId: body.jobOrderId!,
      clientId: body.clientId!,
      amount: body.amount ?? 0,
      type: body.type ?? 'full',
      status: body.status ?? 'pending',
      paidAt: body.paidAt,
      createdAt: body.createdAt ?? now,
    };
    this.invoices.push(newInvoice);
    return newInvoice;
  }

  update(id: string, body: Partial<Invoice>): Invoice {
    const invoice = this.findOne(id);
    const updated = { ...invoice, ...body };
    const idx = this.invoices.findIndex(
      (i) => String(i.id) === id || i.id === Number(id),
    );
    if (idx >= 0) this.invoices[idx] = updated;
    return updated;
  }
}
