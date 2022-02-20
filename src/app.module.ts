import { Module } from '@nestjs/common';
import { DoctorModule } from './doctor/doctor.module';
import { SpecialtyModule } from './speciality/specialty.module';

@Module({
  imports: [DoctorModule, SpecialtyModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
