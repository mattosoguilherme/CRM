import { Module } from '@nestjs/common';
import { DoctorModule } from './doctor/doctor.module';
import { SpecialityModule } from './speciality/speciality.module';

@Module({
  imports: [DoctorModule, SpecialityModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
