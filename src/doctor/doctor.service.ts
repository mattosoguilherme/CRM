import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Doctor } from '@prisma/client';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';

import { Validation } from 'src/validations.service';

@Injectable()
export class DoctorService {
  constructor(
    private prismaService: PrismaService,
    private validation: Validation,
  ) {}

  async create(createDoctorDto: CreateDoctorDto): Promise<Doctor> {
    const { complement, cep, crm, cell_phone, specialty, landline } =
      createDoctorDto;

    const fieldEdited = await this.validation.fieldsValidator(createDoctorDto);

    await this.validation.crmValidator(crm);

    const adress = await this.validation.SearchAdress(cep);

    const doctorCreatred = await this.prismaService.doctor.create({
      data: {
        name: fieldEdited.name,
        crm: crm,
        cell_phone: cell_phone,
        landline: landline,
        cep: cep,
        logradouro: adress.logradouro,
        localidade: adress.localidade,
        bairro: adress.bairro,
        uf: adress.uf,
        complement: complement,
        Specialty: { connect: specialty.map((s) => ({ id: s })) },
      },
      include: { Specialty: true },
    });

    return doctorCreatred;
  }

  async update(id: string, updateDoctorDto: UpdateDoctorDto) {
    const {
      complement,
      cep,
      crm,
      cell_phone,
      landline,
      logradouro,
      localidade,
      bairro,
      specialty,
      uf,
    } = updateDoctorDto;

    await this.validation.findDoctorByCrm(crm);

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
          landline: landline,
          cep: cep,
          logradouro: logradouro,
          localidade: localidade,
          bairro: bairro,
          uf: uf,
          complement: complement,
          Specialty: { connect: specialty.map((s) => ({ id: s })) },
        },
        include: { Specialty: true },
      });
    }

    return await this.prismaService.doctor.update({
      where: { id: doctor.id },
      data: {
        name: fieldEdited.name,
        crm: crm,
        cell_phone: cell_phone,
        Specialty: {
          connect: updateDoctorDto.specialty.map((s) => ({ id: s })),
        },
        landline: landline,
        cep: cep,
        logradouro: adress.logradouro,
        localidade: adress.localidade,
        bairro: adress.bairro,
        uf: adress.uf,
        complement: complement,
      },
      include: { Specialty: true },
    });
  }

  async findAll(): Promise<Doctor[]> {
    return await this.prismaService.doctor.findMany({
      select: {
        id: true,
        name: true,
        crm: true,
        landline: true,
        cell_phone: true,
        cep: true,
        logradouro: true,
        bairro:true,
        complement:true,
        localidade: true,
        uf: true,
        Specialty: { select: { specialty: true } },
        createdAT:true,
        updatedAT:true,
      },
    });
  }

  async findById(id: string): Promise<Doctor> {
    return await this.prismaService.doctor.findUnique({ where: { id: id } });
  }

  async findCRM(field: string): Promise<Doctor> {
    return await this.validation.findDoctorByCrm(field);
  }




  async remove(id: string) {
    const doctor = await this.validation.findDoctorById(id);

    await this.prismaService.doctor.delete({ where: { id: id } });

    return {
      message: `Cadastro do(a) Dr(a) ${doctor.name}  deletado com sucesso.`,
    };
  }
}
