import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Material } from '../common/types';
import { MaterialEntity } from '../entities';

function toMaterial(e: MaterialEntity): Material {
  const q = Number(e.quantityInStock);
  const m = e.minThreshold != null ? Number(e.minThreshold) : undefined;
  return {
    id: e.id,
    code: e.code,
    name: e.name,
    unit: e.unit,
    quantityInStock: Number.isNaN(q) ? 0 : q,
    minThreshold: m,
    createdAt: e.createdAt?.toISOString?.() ?? new Date().toISOString(),
  };
}

@Injectable()
export class MaterialsService {
  constructor(
    @InjectRepository(MaterialEntity)
    private readonly repo: Repository<MaterialEntity>,
  ) {}

  async findAll(): Promise<Material[]> {
    const list = await this.repo.find({ order: { id: 'ASC' } });
    return list.map(toMaterial);
  }

  async findOne(id: string): Promise<Material> {
    const numId = Number(id);
    const entity =
      !Number.isNaN(numId) && numId > 0
        ? await this.repo.findOne({ where: { id: numId } })
        : null;
    if (!entity) throw new NotFoundException(`Material ${id} not found`);
    return toMaterial(entity);
  }

  async update(id: string, body: Partial<Material>): Promise<Material> {
    const entity = await this.repo.findOne({
      where: { id: Number(id) },
    });
    if (!entity) throw new NotFoundException(`Material ${id} not found`);
    Object.assign(entity, body);
    await this.repo.save(entity);
    return toMaterial(entity);
  }
}
