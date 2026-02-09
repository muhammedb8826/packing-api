import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('shifts')
export class ShiftEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 20 })
  startTime: string;

  @Column({ type: 'varchar', length: 20 })
  endTime: string;

  @CreateDateColumn()
  createdAt: Date;
}
