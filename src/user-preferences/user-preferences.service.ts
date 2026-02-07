import { Injectable, NotFoundException } from '@nestjs/common';
import { UserPreferences } from '../common/types';

@Injectable()
export class UserPreferencesService {
  private preferences: UserPreferences[] = [
    {
      id: 1,
      clientId: 1,
      notificationType: 'email',
      dashboardView: 'progress',
      reportingFrequency: 'weekly',
      accessLevel: 'full',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  private nextId = 2;

  findAll(clientId?: string): UserPreferences[] {
    if (clientId !== undefined && clientId !== '') {
      return this.preferences.filter(
        (p) => String(p.clientId) === String(clientId),
      );
    }
    return this.preferences;
  }

  findOne(id: string): UserPreferences {
    const numId = Number(id);
    const pref =
      !Number.isNaN(numId) && typeof numId === 'number'
        ? this.preferences.find((p) => p.id === numId)
        : this.preferences.find((p) => String(p.id) === id);
    if (!pref) {
      throw new NotFoundException(`UserPreferences ${id} not found`);
    }
    return pref;
  }

  update(id: string, body: Partial<UserPreferences>): UserPreferences {
    const pref = this.findOne(id);
    const updated = { ...pref, ...body, updatedAt: new Date().toISOString() };
    const idx = this.preferences.findIndex(
      (p) => String(p.id) === id || p.id === Number(id),
    );
    if (idx >= 0) this.preferences[idx] = updated;
    return updated;
  }

  create(
    body: Omit<UserPreferences, 'id' | 'createdAt' | 'updatedAt'>,
  ): UserPreferences {
    const now = new Date().toISOString();
    const newPref: UserPreferences = {
      id: this.nextId++,
      ...body,
      createdAt: now,
      updatedAt: now,
    };
    this.preferences.push(newPref);
    return newPref;
  }
}
