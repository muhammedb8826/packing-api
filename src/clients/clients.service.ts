import { Injectable, NotFoundException } from '@nestjs/common';
import { Client } from '../common/types';

@Injectable()
export class ClientsService {
  private clients: Client[] = [
    {
      id: 1,
      code: 'C001',
      name: 'Acme Corp',
      contact: 'John Doe',
      email: 'john@acme.com',
      phone: '+1 555-0100',
      address: '123 Main St',
      createdAt: new Date().toISOString(),
    },
    {
      id: 2,
      code: 'C002',
      name: 'Beta Industries',
      contact: 'Jane Smith',
      email: 'jane@beta.com',
      createdAt: new Date().toISOString(),
    },
  ];

  private nextId = 3;

  findAll(): Client[] {
    return this.clients;
  }

  findOne(id: string): Client {
    const numId = Number(id);
    const client =
      typeof numId === 'number' && !Number.isNaN(numId)
        ? this.clients.find((c) => c.id === numId)
        : this.clients.find((c) => String(c.id) === id);
    if (!client) {
      throw new NotFoundException(`Client ${id} not found`);
    }
    return client;
  }
}
