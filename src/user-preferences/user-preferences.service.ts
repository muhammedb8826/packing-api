import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserPreferences } from '../common/types';
import { UserPreferenceEntity } from '../entities';

function toPref(e: UserPreferenceEntity): UserPreferences {
  return {
    id: e.id,
    clientId: e.clientId,
    notificationType: e.notificationType as UserPreferences['notificationType'],
    dashboardView: e.dashboardView as UserPreferences['dashboardView'],
    reportingFrequency:
      e.reportingFrequency as UserPreferences['reportingFrequency'],
    accessLevel: e.accessLevel as UserPreferences['accessLevel'],
    createdAt: e.createdAt?.toISOString?.() ?? new Date().toISOString(),
    updatedAt: e.updatedAt?.toISOString?.() ?? new Date().toISOString(),
  };
}

@Injectable()
export class UserPreferencesService {
  constructor(
    @InjectRepository(UserPreferenceEntity)
    private readonly repo: Repository<UserPreferenceEntity>,
  ) {}

  async findAll(clientId?: string): Promise<UserPreferences[]> {
    const where = clientId ? { clientId: Number(clientId) } : {};
    const list = await this.repo.find({ where, order: { id: 'ASC' } });
    return list.map(toPref);
  }

  async update(
    id: string,
    body: Partial<UserPreferences>,
  ): Promise<UserPreferences> {
    const numId = Number(id);
    const entity = await this.repo.findOne({
      where: !Number.isNaN(numId) ? { id: numId } : undefined,
    });
    if (!entity) throw new NotFoundException(`UserPreferences ${id} not found`);
    Object.assign(entity, body);
    await this.repo.save(entity);
    return toPref(entity);
  }

  async create(
    body: Omit<UserPreferences, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<UserPreferences> {
    const entity = this.repo.create({
      clientId: Number(body.clientId),
      notificationType: body.notificationType,
      dashboardView: body.dashboardView,
      reportingFrequency: body.reportingFrequency,
      accessLevel: body.accessLevel,
    });
    const saved = await this.repo.save(entity);
    return toPref(saved);
  }
}
