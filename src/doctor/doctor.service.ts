import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Doctor } from '@prisma/client';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';

import { Validation } from 'src/validations';
import DoctorDto from './dto/doctor.dto';

@Injectable()
export class DoctorService {
  constructor(
    private prismaService: PrismaService,
    private validation: Validation,
  ) {}

  async create(createDoctorDto: CreateDoctorDto): Promise<Doctor> {
    const {
      complement,
      cep,
      name,
      crm,
      cell_phone,
      medical_specialty,
      landline,
    } = createDoctorDto;

    const fieldEdited = await this.validation.fieldsValidator(createDoctorDto);

    await this.validation.crmValidator(crm);

    const adress = await this.validation.SearchAdress(cep);

    const doctorCreatred = await this.prismaService.doctor.create({
      data: {
        name: fieldEdited.name,
        crm: crm,
        cell_phone: cell_phone,
        medical_specialty: medical_specialty,
        landline: landline,
        cep: cep,
        logradouro: adress.logradouro,
        localidade: adress.localidade,
        bairro: adress.bairro,
        uf: adress.uf,
        complement: complement,
      },
    });

    return doctorCreatred;
  }

  async update(id: string, updateDoctorDto: UpdateDoctorDto) {
    const {
      complement,
      cep,
      name,
      crm,
      cell_phone,
      medical_specialty,
      landline,
      logradouro,
      localidade,
      bairro,
      uf,
    } = updateDoctorDto;

    await this.validation.findDoctorByCrm(crm)

    const fieldEdited = await this.validation.fieldsValidator(updateDoctorDto);

    const doctor = await this.validation.findDoctorById(id);

    const adress = await this.validation.SearchAdress(cep);

    if (!cep) {
      return await this.prismaService.doctor.update({
        where: { id: doctor.id },
        data: {
          name: fieldEdited.name,
          crm: crm,
          cell_phone: cell_phone,
          medical_specialty: medical_specialty,
          landline: landline,
          cep: cep,
          logradouro: logradouro,
          localidade: localidade,
          bairro: bairro,
          uf: uf,
          complement: complement,
        },
      });
    }

    return await this.prismaService.doctor.update({
      where: { id: doctor.id },
      data: {
        name: fieldEdited.name,
        crm: crm,
        cell_phone: cell_phone,
        medical_specialty: medical_specialty,
        landline: landline,
        cep: cep,
        logradouro: adress.logradouro,
        localidade: adress.localidade,
        bairro: adress.bairro,
        uf: adress.uf,
        complement: complement,
      },
    });
  }

  async findAll(): Promise<Doctor[]> {
    return await this.prismaService.doctor.findMany();
  }

  async findById(id: string): Promise<Doctor> {
    return await this.prismaService.doctor.findUnique({ where: { id: id } });
  }

  async findCRM(field: string): Promise<Doctor> {
    return await this.validation.findDoctorByCrm(field);
  }

  async findName(field: string): Promise<Doctor> {
    const nome = await this.prismaService.doctor.findFirst({
      where: { name: field },
    });
    return nome;
  }

  async findLandline(field: any): Promise<Doctor> {
    return await this.prismaService.doctor.findFirst({
      where: { landline: field },
    });
  }

  async findCellPhone(field: any): Promise<Doctor> {
    return await this.prismaService.doctor.findFirst({
      where: { cell_phone: field },
    });
  }

  async findCep(field: any): Promise<Doctor> {
    return await this.prismaService.doctor.findFirst({ where: { cep: field } });
  }

  async findSpeciality(field: any): Promise<Doctor> {
    return await this.prismaService.doctor.findFirst({
      where: { medical_specialty: field },
    });
  }

  async remove(id: string) {

    return await this.validation.findDoctorById(id)  ;
  }
}
