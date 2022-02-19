import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateDoctorDto {
    @ApiProperty({default:'Atualizado'})  
    @IsString({message:"Esse campo precisar ser um texto."})
    @IsNotEmpty({message:"Você precisa preencher este campo."})
    @IsOptional()
    name: string;
  
    @ApiProperty({default:'1234567'}) 
    @IsNotEmpty({message:"Você precisa preencher este campo."})
    @IsNumber()
    @IsOptional()
    crm: Number;
  
    @ApiProperty({default:'123456'}) 
    @IsNotEmpty({message:"Você precisa preencher este campo."})
    @IsNumber()
    @IsOptional()
    landline: number;
  
    @ApiProperty({default:'123456'}) 
    @IsNotEmpty({message:"Você precisa preencher este campo."})
    @IsNumber()
    @IsOptional()
    cell_phone: number;
  
    @ApiProperty({default:'123456'})
    @IsNotEmpty({message:"Você precisa preencher este campo."}) 
    @IsNumber()
    @IsOptional()
    cep: number;

    @ApiProperty({default:'Ap 33 bloco B'})  
    @IsString({message:"Esse campo precisar ser um texto."})
    @IsNotEmpty({message:"Você precisa preencher este campo."})
    @IsOptional()
    complement:string;
  
    @ApiProperty({default:'Atualizado 1, Atualizado 2'}) 
    @IsString({message:"Esse precisar ser um texto"})
    @IsNotEmpty({message:"Você precisa preencher este campo."})
    @IsOptional()
    medical_specialty: string;

}