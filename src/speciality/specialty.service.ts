import { ConflictException, Injectable } from '@nestjs/common';
import { Specialty } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateSpecialtyDto } from './dto/create-specialty.dto';
import { UpdateSpecialtyDto } from './dto/update-specialty.dto';

@Injectable()
export class SpecialtyService {
  constructor(private prismaService: PrismaService) {}

  async create(createSpecialtyDto: CreateSpecialtyDto): Promise<Specialty> {
    const s = await this.prismaService.specialty.findFirst({
      where: { specialty: createSpecialtyDto.specialty },
    });

    if (s) {
      throw new ConflictException('Especialidade já cadastrada.');
    }

    return await this.prismaService.specialty.create({
      data: createSpecialtyDto,
    });
  }

  async findAll(): Promise<Specialty[]> {
    return await this.prismaService.specialty.findMany();
  }

  async update(
    id: number,
    updateSpecialtyDto: UpdateSpecialtyDto,
  ): Promise<Specialty> {
    return await this.prismaService.specialty.update({
      where: { id: id },
      data: updateSpecialtyDto,
    });
  }

  async remove(id: number): Promise<Specialty> {
    return await this.prismaService.specialty.delete({ where: { id: id } });
  }
}
