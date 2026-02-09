import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('labor_assignments')
export class LaborAssignmentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  jobOrderId: number;

  @Column('int')
  employeeId: number;

  @Column('int')
  shiftId: number;

  @Column({ type: 'timestamptz' })
  assignedAt: Date;
}
