import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('material_issues')
export class MaterialIssueEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  jobOrderId: number;

  @Column('int')
  materialId: number;

  @Column('decimal', { precision: 14, scale: 2 })
  quantity: number;

  @Column({ type: 'timestamptz' })
  issuedAt: Date;
}
