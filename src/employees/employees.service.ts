import { Injectable } from '@nestjs/common';
import { Employee } from '../common/types';

@Injectable()
export class EmployeesService {
  private employees: Employee[] = [
    {
      id: 1,
      code: 'E001',
      name: 'Alice Johnson',
      skills: ['assembly', 'qc'],
      available: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: 2,
      code: 'E002',
      name: 'Bob Williams',
      skills: ['packing', 'dispatch'],
      available: true,
      createdAt: new Date().toISOString(),
    },
  ];

  findAll(): Employee[] {
    return this.employees;
  }
}
