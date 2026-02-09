import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  ClientEntity,
  UserPreferenceEntity,
  JobOrderEntity,
  EmployeeEntity,
  ShiftEntity,
  MaterialEntity,
} from '../entities';
import { SeederService } from './seeder.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ClientEntity,
      UserPreferenceEntity,
      JobOrderEntity,
      EmployeeEntity,
      ShiftEntity,
      MaterialEntity,
    ]),
  ],
  providers: [SeederService],
})
export class SeederModule {}
