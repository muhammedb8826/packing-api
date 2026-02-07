import { Module } from '@nestjs/common';
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

@Module({
  imports: [
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
