import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateDoctorDto {
  
  @ApiProperty({default:'Sergio Nunes Pereira do Santos'})  
  @IsString({message:"Esse campo precisar ser um texto."})
  @IsNotEmpty({message:"Você precisa preencher este campo."})
  name: string;

  @ApiProperty({default:'1234567'}) 
  @IsNotEmpty({message:"Você precisa preencher este campo."})
  @IsString({message:"Esse campo precisar ser um texto."})
  crm: string;

  @ApiProperty({default:'0123456789'}) 
  @IsNotEmpty({message:"Você precisa preencher este campo."})
  @IsString({message:"Esse campo precisar ser um texto."})
  landline: string;

  @ApiProperty({default:'00123456789'}) 
  @IsNotEmpty({message:"Você precisa preencher este campo."})
  @IsString({message:"Esse campo precisar ser um texto."})
  cell_phone: string;

  @ApiProperty({default:'25550000'})
  @IsNotEmpty({message:"Você precisa preencher este campo."}) 
  @IsString({message:"Esse campo precisar ser um texto."})
  cep: string;

  @ApiProperty({default:'Ap 33 bloco B'})  
  @IsString({message:"Esse campo precisar ser um texto."})
  @IsNotEmpty({message:"Você precisa preencher este campo."})
  complement:string;

  @ApiProperty({default:[1,2,3,4,5,6,7,8]}) 
  @IsArray()
  @IsNotEmpty({message:"Você precisa preencher este campo."})
  specialty: number[];

}
