import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SpecialtyService } from './specialty.service';
import { CreateSpecialtyDto } from './dto/create-specialty.dto';
import { UpdateSpecialtyDto } from './dto/update-specialty.dto';

@Controller('speciality')
export class SpecialtyController {
  constructor(private readonly specialityService: SpecialtyService) {}

  @Post()
  create(@Body() createSpecialityDto: CreateSpecialtyDto) {
    return this.specialityService.create(createSpecialityDto);
  }

  @Get()
  findAll() {
    return this.specialityService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSpecialityDto: UpdateSpecialtyDto) {
    return this.specialityService.update(+id, updateSpecialityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.specialityService.remove(+id);
  }
}
