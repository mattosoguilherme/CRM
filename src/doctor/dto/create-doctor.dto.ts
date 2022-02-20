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

  @ApiProperty({default:'113333456'}) 
  @IsNotEmpty({message:"Você precisa preencher este campo."})
  @IsString({message:"Esse campo precisar ser um texto."})
  landline: string;

  @ApiProperty({default:'11999998765'}) 
  @IsNotEmpty({message:"Você precisa preencher este campo."})
  @IsString({message:"Esse campo precisar ser um texto."})
  cell_phone: string;

  @ApiProperty({default:'8710680'})
  @IsNotEmpty({message:"Você precisa preencher este campo."}) 
  @IsString({message:"Esse campo precisar ser um texto."})
  cep: string;

  @ApiProperty({default:'Ap 33 bloco B'})  
  @IsString({message:"Esse campo precisar ser um texto."})
  @IsNotEmpty({message:"Você precisa preencher este campo."})
  complement:string;

  @ApiProperty({default:'Cirurgia de tórax, Cirurgia cardíaca'}) 
  @IsArray()
  @IsNotEmpty({message:"Você precisa preencher este campo."})
  specialty: number[];

}
