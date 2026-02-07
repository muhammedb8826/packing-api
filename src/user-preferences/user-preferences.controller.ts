import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UserPreferences } from '../common/types';
import { UserPreferencesService } from './user-preferences.service';

@Controller('userPreferences')
export class UserPreferencesController {
  constructor(
    private readonly userPreferencesService: UserPreferencesService,
  ) {}

  @Get()
  findAll(@Query('clientId') clientId?: string) {
    return this.userPreferencesService.findAll(clientId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: Record<string, unknown>) {
    return this.userPreferencesService.update(id, body);
  }

  @Post()
  create(@Body() body: Record<string, unknown>) {
    return this.userPreferencesService.create(
      body as Omit<UserPreferences, 'id' | 'createdAt' | 'updatedAt'>,
    );
  }
}
