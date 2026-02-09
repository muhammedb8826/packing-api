import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QcRecordEntity } from '../entities';
import { QcRecordsController } from './qc-records.controller';
import { QcRecordsService } from './qc-records.service';

@Module({
  imports: [TypeOrmModule.forFeature([QcRecordEntity])],
  controllers: [QcRecordsController],
  providers: [QcRecordsService],
  exports: [QcRecordsService],
})
export class QcRecordsModule {}
