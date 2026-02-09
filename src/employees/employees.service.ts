import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from '../common/types';
import { EmployeeEntity } from '../entities';

function toEmployee(e: EmployeeEntity): Employee {
  const skills =
    typeof e.skills === 'string'
      ? e.skills.split(',').map((s) => s.trim())
      : [];
  return {
    id: e.id,
    code: e.code,
    name: e.name,
    skills,
    available: e.available,
    createdAt: e.createdAt?.toISOString?.() ?? new Date().toISOString(),
  };
}

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(EmployeeEntity)
    private readonly repo: Repository<EmployeeEntity>,
  ) {}

  async findAll(): Promise<Employee[]> {
    const list = await this.repo.find({ order: { id: 'ASC' } });
    return list.map(toEmployee);
  }
}
