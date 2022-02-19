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
  findOne(@Param('id') id: string): Promise<Doctor> {
    return this.doctorService.findOne(id);
  }

  @Get('/findName/:name')
  @ApiOperation({ summary: 'Busca no banco médicos pelo nome' })
  findName(@Param('name') name: string): Promise<Doctor> {
    return this.doctorService.findName(name);
  }

  @Get('/findCRM/:CRM')
  @ApiOperation({ summary: 'Busca no banco médicos pelo CRM' })
  findCRM(@Param('CRM') CRM: number): Promise<Doctor> {
    return this.doctorService.findCRM(CRM);
  }

  @Get('/findLandline/:landline')
  @ApiOperation({ summary: 'Busca no banco médicos pelo telefone fixo' })
  findLandline(@Param('landline') landline: number): Promise<Doctor> {
    return this.doctorService.findLandline(landline);
  }

  @Get('/findCellPhone/:cellPhone')
  @ApiOperation({ summary: 'Busca no banco médicos pelo telefone celular' })
  findCellPhone(@Param('cellPhone') cellPhone: number): Promise<Doctor> {
    return this.doctorService.findCellPhone(cellPhone);
  }

  @Get('/findCep/:cep')
  @ApiOperation({ summary: 'Busca no banco médicos pelo telefone celular' })
  findCep(@Param('cep') cep: number): Promise<Doctor> {
    return this.doctorService.findCep(cep);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza o cadastro do médico' })
  update(@Param('id') id: string, @Body() updateDoctorDto: UpdateDoctorDto) {
    return this.doctorService.update(+id, updateDoctorDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Apaga cadastro do médico' })
  remove(@Param('id') id: string) {
    return this.doctorService.remove(+id);
  }
}
