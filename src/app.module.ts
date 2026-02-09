import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule } from './clients/clients.module';
import { UserPreferencesModule } from './user-preferences/user-preferences.module';
import { JobOrdersModule } from './job-orders/job-orders.module';
import { EmployeesModule } from './employees/employees.module';
import { ShiftsModule } from './shifts/shifts.module';
import { LaborAssignmentsModule } from './labor-assignments/labor-assignments.module';
import { MaterialsModule } from './materials/materials.module';
import { MaterialIssuesModule } from './material-issues/material-issues.module';
import { ProductionLogsModule } from './production-logs/production-logs.module';
import { QcRecordsModule } from './qc-records/qc-records.module';
import { InvoicesModule } from './invoices/invoices.module';
import { SeederModule } from './seeder/seeder.module';
import {
  ClientEntity,
  UserPreferenceEntity,
  JobOrderEntity,
  EmployeeEntity,
  ShiftEntity,
  LaborAssignmentEntity,
  MaterialEntity,
  MaterialIssueEntity,
  ProductionLogEntity,
  QcRecordEntity,
  InvoiceEntity,
} from './entities';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST', 'localhost'),
        port: parseInt(String(config.get('DB_PORT') || 5432), 10),
        username: config.get('DB_USERNAME', 'postgres'),
        password: config.get('DB_PASSWORD', ''),
        database: config.get('DB_DATABASE', 'packing'),
        synchronize: config.get('DB_SYNCHRONIZE', 'true') === 'true',
        logging: config.get('DB_LOGGING', 'false') === 'true',
        entities: [
          ClientEntity,
          UserPreferenceEntity,
          JobOrderEntity,
          EmployeeEntity,
          ShiftEntity,
          LaborAssignmentEntity,
          MaterialEntity,
          MaterialIssueEntity,
          ProductionLogEntity,
          QcRecordEntity,
          InvoiceEntity,
        ],
      }),
      inject: [ConfigService],
    }),
    SeederModule,
    ClientsModule,
    UserPreferencesModule,
    JobOrdersModule,
    EmployeesModule,
    ShiftsModule,
    LaborAssignmentsModule,
    MaterialsModule,
    MaterialIssuesModule,
    ProductionLogsModule,
    QcRecordsModule,
    InvoicesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
