import { Module } from '@nestjs/common';
import { QcRecordsController } from './qc-records.controller';
import { QcRecordsService } from './qc-records.service';

@Module({
  controllers: [QcRecordsController],
  providers: [QcRecordsService],
  exports: [QcRecordsService],
})
export class QcRecordsModule {}
