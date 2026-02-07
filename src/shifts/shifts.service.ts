import { Injectable } from '@nestjs/common';
import { Shift } from '../common/types';

@Injectable()
export class ShiftsService {
  private shifts: Shift[] = [
    {
      id: 1,
      name: 'Morning',
      startTime: '06:00',
      endTime: '14:00',
      createdAt: new Date().toISOString(),
    },
    {
      id: 2,
      name: 'Afternoon',
      startTime: '14:00',
      endTime: '22:00',
      createdAt: new Date().toISOString(),
    },
  ];

  findAll(): Shift[] {
    return this.shifts;
  }
}
