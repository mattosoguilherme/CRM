import { IsNotEmpty, IsString } from "class-validator";

export default class DoctorDto {
  
  id:string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsString()
  crm: string;

  @IsNotEmpty()
  @IsString()
  landline: string;

  @IsNotEmpty()
  @IsString()
  cell_phone: string;

  @IsNotEmpty()
  @IsString()
  cep: string;

  @IsNotEmpty()
  @IsString()
  medical_specialty: string;

  @IsNotEmpty()
  @IsString()
  logradouro: string;

  @IsNotEmpty()
  @IsString()
  bairro: string;

  @IsNotEmpty()
  @IsString()
  localidade: string;
  
  @IsNotEmpty()
  @IsString()
  uf: string;

  @IsNotEmpty()
  @IsString()
  complement: string;

  @IsNotEmpty()
  @IsString()
  createdAT:Date;

  @IsNotEmpty()
  @IsString()
  updatedAT:Date;

}
