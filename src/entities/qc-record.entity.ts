import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('qc_records')
export class QcRecordEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  jobOrderId: number;

  @Column({ type: 'varchar', length: 20 })
  result: string;

  @Column({ type: 'text', nullable: true })
  notes: string | null;

  @Column({ type: 'timestamptz' })
  checkedAt: Date;
}
