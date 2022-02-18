import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateDoctorDto {
  
  @ApiProperty({default:'Sergio Nunes Pereira do Santos'})  
  @IsString({message:"Esse campo precisar ser um texto."})
  @IsNotEmpty({message:"Você precisa preencher este campo."})
  name: string;

  @ApiProperty({default:'1234567'}) 
  @IsNotEmpty({message:"Você precisa preencher este campo."})
  @IsNumber()
  crm: number;

  @ApiProperty({default:'113333456'}) 
  @IsNotEmpty({message:"Você precisa preencher este campo."})
  @IsNumber()
  landline: number;

  @ApiProperty({default:'11999998765'}) 
  @IsNotEmpty({message:"Você precisa preencher este campo."})
  @IsNumber()
  cell_phone: number;

  @ApiProperty({default:'8710680'})
  @IsNotEmpty({message:"Você precisa preencher este campo."}) 
  @IsNumber()
  cep: number;

  @ApiProperty({default:'Cirurgia de tórax, Cirurgia cardíaca'}) 
  @IsString({message:"Esse precisar ser um texto"})
  @IsNotEmpty({message:"Você precisa preencher este campo."})
  medical_specialty: string;
}
