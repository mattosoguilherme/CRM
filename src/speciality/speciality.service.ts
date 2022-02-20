import { ConflictException, Injectable } from '@nestjs/common';
import { Speciality } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateSpecialityDto } from './dto/create-speciality.dto';
import { UpdateSpecialityDto } from './dto/update-speciality.dto';

@Injectable()
export class SpecialityService {
  constructor(private prismaService: PrismaService) {}

  async create(createSpecialityDto: CreateSpecialityDto): Promise<Speciality> {
    const s = await this.prismaService.speciality.findFirst({
      where: { speciality: createSpecialityDto.speciality },
    });

    if (s) {
      throw new ConflictException('Especialidade já cadastrada.');
    }

    return await this.prismaService.speciality.create({
      data: createSpecialityDto,
    });
  }

  async findAll(): Promise<Speciality[]> {
    return await this.prismaService.speciality.findMany();
  }

  async update(
    id: number,
    updateSpecialityDto: UpdateSpecialityDto,
  ): Promise<Speciality> {
    return await this.prismaService.speciality.update({
      where: { id: id },
      data: updateSpecialityDto,
    });
  }

  async remove(id: number): Promise<Speciality> {
    return await this.prismaService.speciality.delete({ where: { id: id } });
  }
}
