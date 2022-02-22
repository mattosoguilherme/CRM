import { Module } from '@nestjs/common';
import { SpecialtyService } from './specialty.service';
import { SpecialtyController } from './specialty.controller';
import { PrismaService } from 'src/prisma.service';
import { Validation } from 'src/validations';

@Module({
  controllers: [SpecialtyController],
  providers: [SpecialtyService, PrismaService, Validation]
})
export class SpecialtyModule {}
