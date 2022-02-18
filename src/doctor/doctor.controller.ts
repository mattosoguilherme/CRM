import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('doctor')
@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Post()
  @ApiOperation({summary:"Cadastro de médico"})
  create(@Body() createDoctorDto: CreateDoctorDto) {
    return this.doctorService.create(createDoctorDto);
  }

  @Get()
  @ApiOperation({summary:"Lista todos os médicos cadastrados"})
  findAll() {
    return this.doctorService.findAll();
  }

  @Get(':id')
  @ApiOperation({summary:"Lista um médico pelo ID "})
  findOne(@Param('id') id: string) {
    return this.doctorService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({summary:"Atualiza o cadastro do médico"})
  update(@Param('id') id: string, @Body() updateDoctorDto: UpdateDoctorDto) {
    return this.doctorService.update(+id, updateDoctorDto);
  }

  @Delete(':id')
  @ApiOperation({summary:"Apaga cadastro do médico"})
  remove(@Param('id') id: string) {
    return this.doctorService.remove(+id);
  }
}
