import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Doctor } from '@prisma/client';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';

@Injectable()
export class DoctorService {
  constructor(private prismaService: PrismaService) {}

  async create(createDoctorDto: CreateDoctorDto): Promise<Doctor> {
    const { cep, name, crm, cell_phone, medical_specialty, landline } =
      createDoctorDto;

    const doctorCreatred = await this.prismaService.doctor.create({
      data: {
        name: name,
        crm: crm,
        cell_phone: cell_phone,
        medical_specialty: medical_specialty,
        landline: landline,
        cep: cep,
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

  async findName(field:any): Promise<Doctor> {

    return await this.prismaService.doctor.findFirst({})

  }

  async findCRM(field:any): Promise<Doctor> {

    return await this.prismaService.doctor.findFirst({})

  }

  async findLandline(field:any): Promise<Doctor> {

    return await this.prismaService.doctor.findFirst({})

  }

  async findCellPhone(field:any): Promise<Doctor> {

    return await this.prismaService.doctor.findFirst({})

  }

  async findFields(field:any): Promise<Doctor> {

    return await this.prismaService.doctor.findFirst({})

  }

  async findSpeciality(field:any): Promise<Doctor> {

    return await this.prismaService.doctor.findFirst({})

  }

  update(id: number, updateDoctorDto: UpdateDoctorDto) {
    return `This action updates a #${id} doctor`;
  }

  remove(id: number) {
    return `This action removes a #${id} doctor`;
  }
}
