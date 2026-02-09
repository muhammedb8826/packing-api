import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Shift } from '../common/types';
import { ShiftEntity } from '../entities';

function toShift(e: ShiftEntity): Shift {
  return {
    id: e.id,
    name: e.name,
    startTime: e.startTime,
    endTime: e.endTime,
    createdAt: e.createdAt?.toISOString?.() ?? new Date().toISOString(),
  };
}

@Injectable()
export class ShiftsService {
  constructor(
    @InjectRepository(ShiftEntity)
    private readonly repo: Repository<ShiftEntity>,
  ) {}

  async findAll(): Promise<Shift[]> {
    const list = await this.repo.find({ order: { id: 'ASC' } });
    return list.map(toShift);
  }
}
