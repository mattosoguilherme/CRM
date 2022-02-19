import { PrismaService } from './prisma.service';
import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import axios from 'axios';
import { Doctor } from '@prisma/client';

@Injectable()
export class Validation {
  constructor(private prismaServive: PrismaService) {}

  async SearchAdress(cep: number) {
    const a = cep.toString().length;

    if (a < 8) {
      throw new ConflictException('O cep precisa ter 8 digitos ');
    }

    const adress = [];
    const notAdress = [];

    await axios
      .get(`https://viacep.com.br/ws/${cep}/json/`)
      .then((r) => {
        adress.push(r.data);
        console.log(r.data)
      })
      .catch((e) => {
        notAdress.push(e);
        console.log(e)
      });

    if (notAdress[0]|| adress[0].erro ) {
      throw new NotFoundException('Cep não encontrado.');
    }

    return adress[0];
  }

  async crmValidator(crm: number): Promise<Doctor> {
    const crmDoctor = crm.toString().length;
    if (crmDoctor < 7) {
      throw new ConflictException('O crm deve ter 7 digitos');
    }

    const c = await this.prismaServive.doctor.findUnique({
      where: { crm: crm },
    });

    if (c) {
      throw new ConflictException(`CRM: ${crm}, já cadastrado.`);
    }

    return;
  }

  async findDoctorByCrm(crm: number): Promise<Doctor> {

    const crmDoctor = crm.toString().length;
    if (crmDoctor < 7) {
      throw new ConflictException('O crm deve ter 7 digitos');
    }
    const crmFinded = await this.prismaServive.doctor.findUnique({
      where: { crm: crm },
    });

    if(!crmFinded){
      throw new NotFoundException(`O CRM: ${crm} não está cadastrado.`)
    }

    return crmFinded;
  }
}
