import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('user_preferences')
export class UserPreferenceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  clientId: number;

  @Column({ type: 'varchar', length: 20 })
  notificationType: string;

  @Column({ type: 'varchar', length: 20 })
  dashboardView: string;

  @Column({ type: 'varchar', length: 20 })
  reportingFrequency: string;

  @Column({ type: 'varchar', length: 20 })
  accessLevel: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
