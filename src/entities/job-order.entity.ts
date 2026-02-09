import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('job_orders')
export class JobOrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, unique: true })
  jobId: string;

  @Column('int')
  clientId: number;

  @Column({ type: 'varchar', length: 30 })
  status: string;

  @Column('jsonb')
  specifications: {
    productType: string;
    quantity: number;
    dimensions?: string;
    material?: string;
    finish?: string;
    notes?: string;
  };

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'timestamptz', nullable: true })
  approvedAt: Date | null;

  @Column('boolean', { default: false })
  assignedToProduction: boolean;

  @Column('boolean', { default: false })
  assignedToHR: boolean;

  @Column('boolean', { default: false })
  hrReady: boolean;

  @Column('boolean', { default: false })
  inventoryReady: boolean;

  @Column('boolean', { default: false })
  productionStarted: boolean;

  @Column({ type: 'varchar', length: 50, nullable: true })
  qcStatus: string | null;

  @Column('boolean', { default: false })
  dispatchReady: boolean;

  @Column({ type: 'timestamptz', nullable: true })
  dispatchedAt: Date | null;

  @Column('boolean', { default: false })
  financialCompleted: boolean;
}
