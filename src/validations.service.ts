import { PrismaService } from './prisma.service';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import axios from 'axios';
import { Doctor, Specialty } from '@prisma/client';
import { CreateDoctorDto } from './doctor/dto/create-doctor.dto';

// Classe validation onde ficam todas as validações

@Injectable()
export class Validation {
  constructor(private prismaService: PrismaService) {}

  // SearchAdress busca na api do correios um cep e devolve no response as informações de endereço do cliente
  async SearchAdress(cep: string) {
    if (cep) {
      const numberCep = Number(cep);
      console.log(numberCep);
      const adress = [];
      const notAdress = [];

      await axios
        .get(`https://viacep.com.br/ws/${numberCep}/json/`)
        .then((r) => {
          adress.push(r.data);
        })
        .catch((e) => {
          notAdress.push(e);
          console.log(e)
        });

      if (notAdress[0] || adress[0].erro) {
        throw new NotFoundException('Cep não encontrado.');
      }

      return adress[0];
    }
  }

  // crmValidator verifica no db se o crm ja está cadastrado
  async crmValidator(crm: string): Promise<Doctor> {
    const c = await this.prismaService.doctor.findUnique({
      where: { crm: crm },
    });

    if (c) {
      throw new ConflictException(`CRM: ${crm}, já cadastrado.`);
    }

    return;
  }

  // findDoctorByCrm procura no db o cliente pelo atributo único (crm)
  async findDoctorByCrm(crm: string): Promise<Doctor> {
    if (crm) {
      const crmFinded = await this.prismaService.doctor.findUnique({
        where: { crm: crm },
      });

      if (!crmFinded) {
        throw new NotFoundException(`O CRM: ${crm} não está cadastrado.`);
      }

      return crmFinded;
    }
  }

  // findDoctorById procura no db o cliente pelo atributo único (id)
  async findDoctorById(id: string): Promise<Doctor> {
    const doctorFinded = await this.prismaService.doctor.findUnique({
      where: { id: id },
    });

    if (!doctorFinded) {
      throw new NotFoundException('Id inesxistente.');
    }

    return doctorFinded;
  }

  // fieldsValidator valida todos os campos de acordo com a regras négocio solitadas
  async fieldsValidator(field: CreateDoctorDto): Promise<CreateDoctorDto> {
    const { name, crm, landline, cell_phone, cep } = field;

    const specialitys = await this.prismaService.specialty.findMany();

    const hasDuplicates = (array) => new Set(array).size !== array.length;

    if (crm) {
      if (isNaN(Number(crm))) {
        throw new ConflictException(
          'Campo CRM aceita somente números. Por gentileza insera as informações novamente.',
        );
      }
      if (crm.length !== 7) {
        throw new ConflictException('O CRM deve ter 7 digitos.');
      }
    }

    if (landline) {
      if (isNaN(Number(landline))) {
        throw new ConflictException(
          'Campo landline aceita somente números. Por gentileza insera as informações novamente.',
        );
      }

      if (landline.length !== 10) {
        throw new ConflictException('O campo landline deve ter 10 digitos.');
      }
    }

    if (cell_phone) {
      if (isNaN(Number(cell_phone))) {
        throw new ConflictException(
          'Campo cell_phone aceita somente números. Por gentileza insera as informações novamente.',
        );
      }

      if (cell_phone.length !== 11) {
        throw new ConflictException('O campo cell_phone deve ter 11 digitos');
      }
    }

    if (cep) {
      if (isNaN(Number(cep))) {
        throw new ConflictException(
          'Campo cep  aceita somente números. Por gentileza insera as informações novamente.',
        );
      }

      if (cep.length !== 8) {
        throw new ConflictException('O campo cep deve ter 8 digitos');
      }
    }

    if (name) {
      const arr = field.name.split(' ');

      for (var x = 0; x < arr.length; x++) {
        arr[x] = arr[x].charAt(0).toUpperCase() + arr[x].slice(1);
      }

      const nEdited = arr.join().replace(',', ' ');

      const fieldEdited = {
        ...field,
        name: nEdited,
      };

      if (fieldEdited.name.length > 120) {
        throw new ConflictException(
          'O limite de caractéres do campo name é de 120.',
        );
      }

      return fieldEdited;
    }

    if (field.specialty) {
      field.specialty.forEach((spec) => {
        if (spec > specialitys.length) {
          throw new NotFoundException('Id da especialidade não encontrado.');
        }
      });

      if (field.specialty.length < 2) {
        throw new ConflictException(
          'O médico dever ter no mínimo 2 especialidades',
        );
      } else if (field.specialty.length > specialitys.length) {
        throw new ConflictException(
          `Limite de especialidades por cadastro atingido. Só é permitido, nessa versão, cadastrar ${specialitys.length} especialidades por médico.`,
        );
      }
      if (hasDuplicates(field.specialty)) {
        throw new ConflictException(
          'Duplicidade de especialidades não é permitida.',
        );
      }
    }

    return;
  }

  // specValidate verifica se especilidade ja esta cadastrada
  async specValidate(spec: string): Promise<Specialty> {
    const s = await this.prismaService.specialty.findFirst({
      where: { specialty: spec },
    });

    if (s) {
      throw new ConflictException('Especialidade já cadastrada.');
    }


    return 
  }

  // findSpecById procura no db a especialidade pelo atributo único (id)
  async findSpecById(id:number):Promise<Specialty>{
    
    const s = await this.prismaService.specialty.findUnique({where:{id:id}})
    
    if(!s){
      throw new NotFoundException("Especialidade não encontrada")
    }
    return
  }
}
