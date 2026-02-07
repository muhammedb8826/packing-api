import { Injectable, NotFoundException } from '@nestjs/common';
import { Material } from '../common/types';

@Injectable()
export class MaterialsService {
  private materials: Material[] = [
    {
      id: 1,
      code: 'MAT001',
      name: 'Kraft board',
      unit: 'kg',
      quantityInStock: 500,
      minThreshold: 100,
      createdAt: new Date().toISOString(),
    },
    {
      id: 2,
      code: 'MAT002',
      name: 'Plastic film',
      unit: 'roll',
      quantityInStock: 50,
      minThreshold: 10,
      createdAt: new Date().toISOString(),
    },
  ];

  findAll(): Material[] {
    return this.materials;
  }

  findOne(id: string): Material {
    const numId = Number(id);
    const material =
      !Number.isNaN(numId) && typeof numId === 'number'
        ? this.materials.find((m) => m.id === numId)
        : this.materials.find((m) => String(m.id) === id);
    if (!material) {
      throw new NotFoundException(`Material ${id} not found`);
    }
    return material;
  }

  update(id: string, body: Partial<Material>): Material {
    const material = this.findOne(id);
    const updated = { ...material, ...body };
    const idx = this.materials.findIndex(
      (m) => String(m.id) === id || m.id === Number(id),
    );
    if (idx >= 0) this.materials[idx] = updated;
    return updated;
  }
}
