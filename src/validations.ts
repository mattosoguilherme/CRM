import { PrismaService } from './prisma.service';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import axios from 'axios';
import { Doctor } from '@prisma/client';
import DoctorDto from './doctor/dto/doctor.dto';

@Injectable()
export class Validation {
  constructor(private prismaServive: PrismaService) {}

  async SearchAdress(cep: string) {
    if (cep) {
      const numberCep = Number(cep);

      const adress = [];
      const notAdress = [];

      await axios
        .get(`https://viacep.com.br/ws/${numberCep}/json/`)
        .then((r) => {
          adress.push(r.data);
        })
        .catch((e) => {
          notAdress.push(e);
        });

      if (notAdress[0] || adress[0].erro) {
        throw new NotFoundException('Cep não encontrado.');
      }

      return adress[0];
    }
  }

  async crmValidator(crm: string): Promise<Doctor> {
    const c = await this.prismaServive.doctor.findUnique({
      where: { crm: crm },
    });

    if (c) {
      throw new ConflictException(`CRM: ${crm}, já cadastrado.`);
    }

    return;
  }

  async findDoctorByCrm(crm: string): Promise<Doctor> {
    if (crm) {
      const crmFinded = await this.prismaServive.doctor.findUnique({
        where: { crm: crm },
      });

      if (!crmFinded) {
        throw new NotFoundException(`O CRM: ${crm} não está cadastrado.`);
      }

      return crmFinded;
    }
  }

  async findDoctorById(id: string): Promise<Doctor> {
    const doctorFinded = await this.prismaServive.doctor.findUnique({
      where: { id: id },
    });

    if (!doctorFinded) {
      throw new NotFoundException('Id inesxistente.');
    }

    return doctorFinded;
  }

  async fieldsValidator(field: any): Promise<Doctor> {
    const { name, crm, landline, cell_phone, cep } = field;

    const arr = name.split(' ');

    for (var x = 0; x < arr.length; x++) {
      arr[x] = arr[x].charAt(0).toUpperCase() + arr[x].slice(1);
    }

    const fieldEdited = {
      ...field,
      name: arr.join(' '),
    };

    if (crm) {
      if (isNaN(Number(crm))) {
        throw new ConflictException(
          'Campo CRM aceita somente números. Por gentileza insera as informações novamente.',
        );
      }
      if (crm.length !== 7) {
        throw new ConflictException('O CRM deve ter 7 digitos.');
      }
    } else if (landline) {
      if (isNaN(Number(landline))) {
        throw new ConflictException(
          'Campo landline aceita somente números. Por gentileza insera as informações novamente.',
        );
      }

      if (landline.length !== 10) {
        throw new ConflictException('O campo landline deve ter 10 digitos.');
      }
    } else if (cell_phone) {
      if (isNaN(Number(cell_phone))) {
        throw new ConflictException(
          'Campo cell_phone aceita somente números. Por gentileza insera as informações novamente.',
        );
      }

      if (cell_phone.length !== 11) {
        throw new ConflictException('O campo cell_phone deve ter 11 digitos');
      }
    } else if (cep) {
      if (isNaN(Number(cep))) {
        throw new ConflictException(
          'Campo cep  aceita somente números. Por gentileza insera as informações novamente.',
        );
      }

      if (cep.length !== 8) {
        throw new ConflictException('O campo cep deve ter 8 digitos');
      }
    } else if (name) {
      if (fieldEdited.name.length > 120) {
        throw new ConflictException(
          'O limite de caractéres do campo name é de 120.',
        );
      }
    }

    return fieldEdited;
  }
}
