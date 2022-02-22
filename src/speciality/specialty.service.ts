import { ConflictException, Injectable } from '@nestjs/common';
import { Specialty } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { Validation } from 'src/validations.service';
import { CreateSpecialtyDto } from './dto/create-specialty.dto';
import { UpdateSpecialtyDto } from './dto/update-specialty.dto';

@Injectable()
export class SpecialtyService {
  constructor(private prismaService: PrismaService, private validation:Validation) {}

  async create(createSpecialtyDto: CreateSpecialtyDto): Promise<Specialty> {

    await this.validation.specValidate(createSpecialtyDto.specialty)

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

    await this.validation.specValidate(updateSpecialtyDto.specialty)
    
    return await this.prismaService.specialty.update({
      where: { id: id },
      data: updateSpecialtyDto,
    });
  }

  async remove(id: number): Promise<Specialty> {
    return await this.prismaService.specialty.delete({ where: { id: id } });
  }
}
