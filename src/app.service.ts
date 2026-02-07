import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getInfo(): { name: string; status: string } {
    return { name: 'packing-api', status: 'ok' };
  }
}
