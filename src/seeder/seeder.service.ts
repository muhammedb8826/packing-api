import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  ClientEntity,
  UserPreferenceEntity,
  JobOrderEntity,
  EmployeeEntity,
  ShiftEntity,
  MaterialEntity,
} from '../entities';

@Injectable()
export class SeederService implements OnModuleInit {
  constructor(
    @InjectRepository(ClientEntity)
    private readonly clientRepo: Repository<ClientEntity>,
    @InjectRepository(UserPreferenceEntity)
    private readonly userPrefRepo: Repository<UserPreferenceEntity>,
    @InjectRepository(JobOrderEntity)
    private readonly jobOrderRepo: Repository<JobOrderEntity>,
    @InjectRepository(EmployeeEntity)
    private readonly employeeRepo: Repository<EmployeeEntity>,
    @InjectRepository(ShiftEntity)
    private readonly shiftRepo: Repository<ShiftEntity>,
    @InjectRepository(MaterialEntity)
    private readonly materialRepo: Repository<MaterialEntity>,
  ) {}

  async onModuleInit() {
    await this.run();
  }

  async run(): Promise<void> {
    const clientCount = await this.clientRepo.count();
    if (clientCount > 0) return;

    await this.clientRepo.save([
      {
        code: 'C001',
        name: 'Acme Corp',
        contact: 'John Doe',
        email: 'john@acme.com',
        phone: '+1 555-0100',
        address: '123 Main St',
      },
      {
        code: 'C002',
        name: 'Beta Industries',
        contact: 'Jane Smith',
        email: 'jane@beta.com',
      },
    ]);

    const [client1, client2] = await this.clientRepo.find({
      order: { id: 'ASC' },
    });

    await this.userPrefRepo.save({
      clientId: client1.id,
      notificationType: 'email',
      dashboardView: 'progress',
      reportingFrequency: 'weekly',
      accessLevel: 'full',
    });

    await this.jobOrderRepo.save([
      {
        jobId: 'JO-2025-00001',
        clientId: client1.id,
        status: 'submitted',
        specifications: {
          productType: 'carton',
          quantity: 1000,
          dimensions: '20x15x10 cm',
          material: 'Kraft',
          finish: 'matte',
          notes: 'Rush order',
        },
      },
      {
        jobId: 'JO-2025-00002',
        clientId: client2.id,
        status: 'approved',
        specifications: { productType: 'plastic', quantity: 500 },
        approvedAt: new Date(),
      },
    ]);

    await this.employeeRepo.save([
      {
        code: 'E001',
        name: 'Alice Johnson',
        skills: 'assembly,qc',
        available: true,
      },
      {
        code: 'E002',
        name: 'Bob Williams',
        skills: 'packing,dispatch',
        available: true,
      },
    ]);

    await this.shiftRepo.save([
      { name: 'Morning', startTime: '06:00', endTime: '14:00' },
      { name: 'Afternoon', startTime: '14:00', endTime: '22:00' },
    ]);

    await this.materialRepo.save([
      {
        code: 'MAT001',
        name: 'Kraft board',
        unit: 'kg',
        quantityInStock: 500,
        minThreshold: 100,
      },
      {
        code: 'MAT002',
        name: 'Plastic film',
        unit: 'roll',
        quantityInStock: 50,
        minThreshold: 10,
      },
    ]);
  }
}
