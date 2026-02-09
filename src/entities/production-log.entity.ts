import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('production_logs')
export class ProductionLogEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  jobOrderId: number;

  @Column('int')
  shiftId: number;

  @Column('int', { default: 0 })
  quantityProduced: number;

  @Column({ type: 'text', nullable: true })
  notes: string | null;

  @Column({ type: 'timestamptz' })
  loggedAt: Date;
}
