import { Module } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { DoctorController } from './doctor.controller';
import { PrismaService } from 'src/prisma.service';
import { Validation } from '../validations';

@Module({
  controllers: [DoctorController],
  providers: [DoctorService, PrismaService, Validation],
})
export class DoctorModule {}
