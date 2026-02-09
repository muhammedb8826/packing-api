import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobOrderEntity } from '../entities';
import { JobOrdersController } from './job-orders.controller';
import { JobOrdersService } from './job-orders.service';

@Module({
  imports: [TypeOrmModule.forFeature([JobOrderEntity])],
  controllers: [JobOrdersController],
  providers: [JobOrdersService],
  exports: [JobOrdersService],
})
export class JobOrdersModule {}
