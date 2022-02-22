import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Doctor } from '@prisma/client';

@ApiTags('doctor')
@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Post()
  @ApiOperation({ summary: 'Cadastro de médico' })
  create(@Body() createDoctorDto: CreateDoctorDto): Promise<Doctor> {
    return this.doctorService.create(createDoctorDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todos os médicos cadastrados' })
  findAll(): Promise<Doctor[]> {
    return this.doctorService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca no banco médicos pelo ID ' })
  findById(@Param('id') id: string): Promise<Doctor> {
    return this.doctorService.findById(id);
  }

  @Get('search/uf/:uf')
  @ApiOperation({
    summary: 'Busca no db todos os médicos com a uf indicada no parametro',
  })
  findDoctorsByUf(@Param('uf') uf: string): Promise<Doctor[]> {
    return this.doctorService.findDoctorsByUf(uf);
  }

  @Get("/search/specialty/:spec")
  @ApiOperation({summary:'Retorna todos os médicos com especialidade indicada no parametro, através do Id de especialidade.'})
  findDoctorsBySpecialty(@Param('spec') spec: number): Promise<Doctor[]>{
    return this.doctorService.findDoctorsBySpecialty(spec)
  }


  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza o cadastro do médico' })
  update(@Param('id') id: string, @Body() updateDoctorDto: UpdateDoctorDto) {
    return this.doctorService.update(id, updateDoctorDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Apaga cadastro do médico' })
  remove(@Param('id') id: string) {
    return this.doctorService.remove(id);
  }
}
