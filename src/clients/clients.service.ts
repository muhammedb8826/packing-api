import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from '../common/types';
import { ClientEntity } from '../entities';

function toClient(e: ClientEntity): Client {
  return {
    id: e.id,
    code: e.code,
    name: e.name,
    contact: e.contact ?? undefined,
    email: e.email ?? undefined,
    phone: e.phone ?? undefined,
    address: e.address ?? undefined,
    createdAt: e.createdAt?.toISOString?.() ?? new Date().toISOString(),
  };
}

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(ClientEntity)
    private readonly repo: Repository<ClientEntity>,
  ) {}

  async findAll(): Promise<Client[]> {
    const list = await this.repo.find({ order: { id: 'ASC' } });
    return list.map(toClient);
  }

  async findOne(id: string): Promise<Client> {
    const numId = Number(id);
    const entity =
      !Number.isNaN(numId) && numId > 0
        ? await this.repo.findOne({ where: { id: numId } })
        : null;
    if (!entity) {
      throw new NotFoundException(`Client ${id} not found`);
    }
    return toClient(entity);
  }
}
