import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MaterialIssueEntity } from '../entities';
import { MaterialIssuesController } from './material-issues.controller';
import { MaterialIssuesService } from './material-issues.service';

@Module({
  imports: [TypeOrmModule.forFeature([MaterialIssueEntity])],
  controllers: [MaterialIssuesController],
  providers: [MaterialIssuesService],
  exports: [MaterialIssuesService],
})
export class MaterialIssuesModule {}
