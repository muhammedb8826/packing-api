import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('materials')
export class MaterialEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  code: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 20 })
  unit: string;

  @Column('decimal', { precision: 14, scale: 2, default: 0 })
  quantityInStock: number;

  @Column('decimal', { precision: 14, scale: 2, nullable: true })
  minThreshold: number | null;

  @CreateDateColumn()
  createdAt: Date;
}
