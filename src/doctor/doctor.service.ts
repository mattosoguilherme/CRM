import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Doctor } from '@prisma/client';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';

import { Validation } from 'src/validations';

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

    await this.validation.crmValidator (crm)

    const adress = await this.validation.SearchAdress(cep);


    const doctorCreatred = await this.prismaService.doctor.create({
      data: {
        name: name,
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

  async findAll(): Promise<Doctor[]> {
    return await this.prismaService.doctor.findMany();
  }

  async findOne(id: string): Promise<Doctor> {
    return await this.prismaService.doctor.findUnique({ where: { id: id } });
  }

  async findCRM(field: number): Promise<Doctor> {
    return await this.prismaService.doctor.findUnique({
      where: { crm: field },
    });
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

  update(id: number, updateDoctorDto: UpdateDoctorDto) {
    return `This action updates a #${id} doctor`;
  }

  remove(id: number) {
    return `This action removes a #${id} doctor`;
  }
}
